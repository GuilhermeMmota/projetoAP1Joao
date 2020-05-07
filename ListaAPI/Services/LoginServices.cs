using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using ListaAPI.Data;
using ListaAPI.Helpers;
using ListaAPI.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ListaAPI.Services
{
    public interface ILoginService
    {
        (User user, string token) Authenticate(Login login);
    }

    public sealed class LoginService : ILoginService
    {
        private readonly ApiContext _dbContext;
        private readonly SecuritySettings _securitySettings;

        public LoginService(ApiContext dbContext, IOptions<SecuritySettings> securitySettings)
        {
            this._dbContext = dbContext;
            this._securitySettings = securitySettings.Value;
        }

        public (User user, string token) Authenticate(Login login)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Username == login.Username && u.Password == AuthenticationHelper.ComputeHash(login.Password));
            
            // return null if user not found
            if (user == null)
                return (null, null);

            // discard password 
            user.Password = string.Empty;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_securitySettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return (user, tokenHandler.WriteToken(token));
        }
    }
}