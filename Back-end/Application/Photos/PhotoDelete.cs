using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class PhotoDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
        public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccesor photoAccesor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IPhotoAccesor photoAccesor,IUserAccessor userAccessor)
            {
                this.context = context;
                this.photoAccesor = photoAccesor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                        .FirstOrDefaultAsync(p =>  p.UserName == userAccessor.GetUsername());
                if (user == null) { return null; }

                var photo = user.Photos.FirstOrDefault(x=> x.Id == request.Id);
                if (photo == null) { return null;
                
                }
                if(photo.IsMain) { return Result<Unit>.Failure("You cant delete main photo"); }

                var result = await photoAccesor.DeletePhoto(photo.Id);
                if (result != null) { return Result<Unit>.Failure("Problem deleting photo from"); }

                user.Photos.Remove(photo);
                var seccess = await context.SaveChangesAsync() > 0;
                if (seccess) { return Result<Unit>.Success(Unit.Value); }
                return Result<Unit>.Failure("Problem deleting photo ");

            }
        }

    }
}
