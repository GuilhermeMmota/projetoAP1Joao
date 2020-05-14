using System.ComponentModel.DataAnnotations.Schema;

namespace ListaAPI.Models
{
    public class User
    {
        public enum RoleEnum { admin, user };

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }
    }
}