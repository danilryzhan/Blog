using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ActivitiesList
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { };

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            
            public readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            

            public async Task<Result<List<ActivityDto>>> Handle(
                Query request, 
                CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result < List < ActivityDto >>.Success(activities);
            }
        }
    }
}
