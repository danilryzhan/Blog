using API.DTOs;
using API.Serveces;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace API.Controllers
{
 
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly TokenService tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x =>x.Email == loginDto.Email);
            if (user == null) { return Unauthorized(); };
            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateUserObject(user);
            }
            else { { return Unauthorized(); }; }
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            };
            var user = new AppUser
            {
                DisplyName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
            };
            var result = await userManager.CreateAsync(user,registerDto.Password);
            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return BadRequest(result.Errors);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplyName,
                Image = user?.Photos?.FirstOrDefault(x=>x.IsMain).Url,
                Token = tokenService.CreateToken(user),
                Username = user.UserName,
            };
        }

        [HttpGet]
        public async Task <ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.Users.Include(p=>p.Photos)
                .FirstOrDefaultAsync(x=>x.Email == User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }




        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
