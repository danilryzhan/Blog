﻿using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config )
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddSwaggerGen();
            services.AddEndpointsApiExplorer();
            services.AddDbContext<DataContext>(
                    options => options.UseSqlServer(config.GetConnectionString("BlogConnectionStrings")));
            services.AddMediatR(typeof(ActivitiesList.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<ActivitiesCreate>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor,UserAccessor>();
            return services; 
             

        }
    }
}
