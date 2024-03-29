﻿
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {

        [Authorize]
        [HttpGet]
        public async Task<ActionResult>GetActivities(CancellationToken ct)
        {
            return HandleResult( await Mediator.Send(new ActivitiesList.Query(),ct));
        } 
        
          
        [HttpGet("{Id}")]
        
        public async Task<ActionResult> GetActivity(Guid Id)
        {
            return HandleResult(await Mediator.Send(new ActivitiesDetails.Query { Id = Id }));
        }

        [HttpPost]
        public   async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new ActivitiesCreate.Command { Activity=activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPost("{id}")]
   
        public async Task<IActionResult> EditActivity(Guid Id , Activity activity)
        {
            activity.Id = Id;
            return HandleResult(await Mediator.Send(new ActivitiesEdit.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id)
        {
            return HandleResult(await Mediator.Send(new ActivitiesDelete.Command { Id = Id }));
        }



        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator
                .Send(new Activity_UpdateAttendance.Command { Id = id }));
        }


    }
}
