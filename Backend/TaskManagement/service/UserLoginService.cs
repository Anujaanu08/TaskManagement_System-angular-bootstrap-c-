using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagement.Models;
using TaskManagement.repository;

namespace TaskManagement.service
{
    public class UserLoginService
    {
        private readonly UserLoginRepository _repository;
        private readonly IConfiguration _configuration;

        public UserLoginService(UserLoginRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        private TokenModal  createToken(UserLogin userLogin)
        {
            var claimlist = new List<Claim>();
            claimlist.Add(new Claim("UserId",userLogin.UserId.ToString()));
            claimlist.Add(new Claim("FullName", userLogin.FullName));
            claimlist.Add(new Claim("Email", userLogin.Email));
            claimlist.Add(new Claim(ClaimTypes.Role, userLogin.Role.ToString()));

            var key = _configuration["JWT:Key"];
            var securitykey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credential = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claimlist,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credential);

            var tokenstring = new JwtSecurityTokenHandler().WriteToken(token);
            return new TokenModal
            {
                token = tokenstring
            };
        }

        public async Task<UserLogin> AddUser(UserLogin userLogin)
        {
            userLogin.Password = BCrypt.Net.BCrypt.HashPassword(userLogin.Password);
            var data =  await _repository.AddUser(userLogin);
            return data;
        }

        public async Task<TokenModal> Login(string email, string password)
        {
            var data = await _repository.Login(email);
            if(data == null)
            {
                throw new Exception("Invalid email...");
            }
            if (!BCrypt.Net.BCrypt.Verify(password,data.Password)) 
            {
                throw new Exception("Wrong password....");
            }
            var response = createToken(data);
            return response;
        }
    }
}
