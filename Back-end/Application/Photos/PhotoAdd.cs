using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class PhotoAdd
    {
        public class Command : IRequest<Result<Photo>>
        {
            public Command(IFormFile file)
            {
                File = file;
            }

            public IFormFile File { get; set; }
        }

        public class Handelr : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccesor photoAccesor;
            private readonly IUserAccessor userAccessor;

            public Handelr(DataContext context, IPhotoAccesor photoAccesor, IUserAccessor userAccessor)
            {
                this.context = context;
                this.photoAccesor = photoAccesor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());
                if (user == null) return null;

                var photoUploadReult = await photoAccesor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadReult.Url,
                    Id = photoUploadReult.PublicId
                };

                if (user.Photos.IsNullOrEmpty()) photo.IsMain = true;
                user.Photos.Add(photo);

                var result = await context.SaveChangesAsync() > 0;

                if(result)return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");

            }

            
        }
    }
}
