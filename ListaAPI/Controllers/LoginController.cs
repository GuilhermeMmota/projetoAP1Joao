using ListaAPI.Data;
using ListaAPI.Models;
using ListaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ListaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApiContext _context;

        private readonly ILoginService _loginService;

        public LoginController(ApiContext context, ILoginService loginService)
        {
            _context = context;
            _loginService = loginService;
        }

        // GET: api/Lista
        [HttpPost]
        public ActionResult<dynamic> Authenticate([FromBody]Login login)
        {
            if (string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password)) {
                return BadRequest();
            }

            var result = _loginService.Authenticate(login);            
            
            // check if user was found
            if (result.user == null)
                return NotFound();

            // check if token was defined (login success)
            if (result.token == null)
                return Forbid();            
                        
            return new
            {
                user = result.user,
                token = result.token
            };
        }
    }
}