using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using TaskManager.Models.DatabaseContext;
using TaskManager.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Models.DatabaseInitializer
{
    public static class DataInitializer
    {
        internal static async System.Threading.Tasks.Task InitializeDataAsync(IServiceProvider serviceProvider)
        {
            await SeedRoles(serviceProvider.GetRequiredService<RoleManager<IdentityRole>>());
            await SeedUsers(serviceProvider.GetRequiredService<UserManager<User>>());
        }

        private static async System.Threading.Tasks.Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (roleManager.Roles.Any()) { return; }
            var roles = new IdentityRole[] {
                new IdentityRole{Name="Admin"},
                new IdentityRole{Name="User"}
                };
            foreach (IdentityRole role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        private static async System.Threading.Tasks.Task SeedUsers(UserManager<User> userManager)
        {
            if (userManager.Users.Any()) { return; }

            var user = new User
            {
                UserName = "admin",
                Email = "admin@localhost"
            };
            await userManager.CreateAsync(user, "Admin.1234");
            await userManager.AddToRoleAsync(user, "Admin");
        }
    }
}
