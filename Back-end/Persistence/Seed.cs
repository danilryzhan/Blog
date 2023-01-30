using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return; 

            var activities = new List<Activity>
{
                new Activity
                {
                    Id = Guid.NewGuid(),
                    Title = "Yoga Class",
                    Description = "A calming and rejuvenating yoga session for all levels.",
                    Date = new DateTime(2023, 2, 5, 10, 0, 0),
                    Category = "Fitness",
                    City = "New York",
                    Venue = "Central Park"
                },
                new Activity
                {
                    Id = Guid.NewGuid(),
                    Title = "Brunch with Friends",
                    Description = "Catch up with friends over a delicious brunch.",
                    Date = new DateTime(2023, 2, 6, 11, 30, 0),
                    Category = "Food & Drink",
                    City = "Los Angeles",
                    Venue = "The Beverly Hills Hotel"
                },
                new Activity
                {
                    Id = Guid.NewGuid(),
                    Title = "Museum Visit",
                    Description = "Explore the latest exhibitions at the museum.",
                    Date = new DateTime(2023, 2, 7, 13, 0, 0),
                    Category = "Culture",
                    City = "London",
                    Venue = "Tate Modern"
                },
            };

            await context.AddRangeAsync(activities);
            await context.SaveChangesAsync();

        }
    }
}
