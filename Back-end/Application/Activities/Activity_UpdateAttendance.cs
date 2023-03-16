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

namespace Application.Activities
{
    public class Activity_UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler (DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .Include(a=>a.Attendees).ThenInclude(u=>u.AppUser)
                    .FirstOrDefaultAsync(x=>x.Id == request.Id);
                if(activity == null) { return null; }

                var user = await context.Users
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor
                    .GetUsername());

                 if(user == null) { return null; }

                var hostUsername = activity.Attendees.FirstOrDefault(x => 
                x.IsHost)?.AppUser?.UserName;

                var attendace = activity.Attendees.FirstOrDefault(a =>
                a.AppUser.UserName == user.UserName);

                if (attendace != null && hostUsername == user.UserName) { 
                activity.IsCancelled = !activity.IsCancelled;   
                }

                if(attendace != null && hostUsername != user.UserName) {
                activity.Attendees.Remove(attendace);
                }

                if (attendace == null) {

                    attendace = new Domain.ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendace);
                }

                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating attendace");



            }
        }
    }
}
