using BFinanceModels;
using BFinanceDbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;

using System;
using Xunit;
using BFinanceBusiness;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace BFinanceTests
{
  public class ExpenseSvcTests
  {
    DbContextOptions<BFinanceContext> _options = new DbContextOptionsBuilder<BFinanceContext>()
                                                       .UseInMemoryDatabase(databaseName: "BFinanceDb").Options;

    //[Fact]
    //public void TestFunction()
    //{
    //  //arrange

    //  //act

    //  //assert
    //}


  }//end Class
}//end Namespace
