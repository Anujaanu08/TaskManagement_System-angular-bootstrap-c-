using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManagement.Models;
using TaskManagement.service;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly UserLoginService _userLoginService;

        public UserLoginController(UserLoginService userLoginService)
        {
            _userLoginService = userLoginService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(UserLogin userLogin)
        {
            try
            {
                var data = await _userLoginService.AddUser(userLogin);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Login(string email , string password)
        {
            try
            {
                var data = await _userLoginService.Login(email, password);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
