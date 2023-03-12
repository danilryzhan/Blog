using Application.Core;
using System.Net;
using System.Text.Json;

namespace API.Middelewere
{
    public class ExceptionMiddleware
    {
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger ,
            IHostEnvironment _env) {
            Next = next;
            Logger = logger;
            Env = _env;
        }

        public RequestDelegate Next { get; }
        public ILogger<ExceptionMiddleware> Logger { get; }
        public IHostEnvironment Env { get; }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, ex.Message);
                context.Response.ContentType = "applocation/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = Env.IsDevelopment()
                    ? new AppExeption(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppExeption(context.Response.StatusCode, "Iternal Server Error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                
                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
