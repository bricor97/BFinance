using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using BFinanceDbContext;
using Microsoft.EntityFrameworkCore;
using BFinanceBusiness;

namespace BFinanceAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      //services.AddCors((options) =>
      //{
      //  options.AddPolicy(name: "dev", builder =>
      //  {
      //    builder.WithOrigins("http://24.130.200.222").AllowAnyHeader().AllowAnyMethod();
      //  });
      //});

      services.AddControllers();
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "BFinanceAPI", Version = "v1" });
      });

      services.AddDbContext<BFinanceContext>(options =>
      {
        if (!options.IsConfigured)
          options.UseSqlServer("Data Source=BRIANSLAPTOP\\SQLEXPRESS;Initial Catalog=BFinanceDb;Integrated Security=True");
      });
      services.AddDistributedMemoryCache();
      services.AddScoped<IAccountService, AccountService>();
      services.AddScoped<IExpenseService, ExpenseService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BFinanceAPI v1"));
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseCors("dev");
      app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
