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
    public class PhotoSetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                UserAccessor = userAccessor;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == UserAccessor.GetUsername());
                if (user == null) { return null; }

                var photo = user.Photos.FirstOrDefault(x=>x.Id ==request.id);

                if (photo == null) { return null;}

                var currentMain =user.Photos.FirstOrDefault(x=> x.IsMain);
                if (currentMain != null) { currentMain.IsMain = false;
                photo.IsMain = true;
                }

                var succes = await context.SaveChangesAsync()>0;

                if (succes) { return Result<Unit>.Success(Unit.Value); }

                return Result<Unit>.Failure("Problem setting main photo");

            }
        }
    }
}
