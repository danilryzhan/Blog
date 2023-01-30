using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : Controller
    {

        public DataContext _context { get; set; }   
        public ActivitiesController(DataContext context) { 
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>>GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid Id)
        {
            return await _context.Activities.FindAsync(Id);
        }

    }
}
