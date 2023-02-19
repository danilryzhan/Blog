
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<Activity>>>GetActivities(CancellationToken ct)
        {
            return await Mediator.Send(new ActivitiesList.Query(),ct);
        }
        [HttpGet("{Id}")]   
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            return await Mediator.Send(new ActivitiesDetails.Query { Id = Id });
        }

        [HttpPost]
        public   async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new ActivitiesCreate.Command { Activity=activity}));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> EditActivity(Guid Id , Activity activity)
        {
            activity.Id = Id;
            return Ok(await Mediator.Send(new ActivitiesEdit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id)
        {
            return Ok(await Mediator.Send(new ActivitiesDelete.Command { Id = Id }));
        }


    }
}
