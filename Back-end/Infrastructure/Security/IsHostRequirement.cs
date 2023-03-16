using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsHostRequirement :IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dBcontext;
        private readonly IHttpContextAccessor accessor;
  

        public IsHostRequirementHandler(DataContext dBcontext,IHttpContextAccessor accessor)
        {
            this.dBcontext = dBcontext;
            this.accessor = accessor;
           
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement )
        {
            
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Task.CompletedTask;
            }
            var activityId = Guid.Parse(accessor.HttpContext.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = dBcontext.ActivityAttendees
                 .AsNoTracking() // handle memory leak bug wiping attendees
                                 // .FindAsync(userId, activityId).Result; // doesn't work with AsNoTracking()
                 .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                 .Result;

            if (attendee == null) {return Task.CompletedTask; }
            if (attendee.IsHost) context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
