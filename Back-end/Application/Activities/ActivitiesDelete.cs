using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ActivitiesDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public Handler(DataContext context)
            {
                _context = context;
                
            }

            public DataContext _context { get; }
           

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Id);
                if(act == null) { return null; }

                 _context.Remove(act);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) { return Result<Unit>.Failure("Failed to delete"); }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
