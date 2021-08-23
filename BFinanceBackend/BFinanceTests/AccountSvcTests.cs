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
  public class AccountSvcTests
  {
    DbContextOptions<BFinanceContext> _options = new DbContextOptionsBuilder<BFinanceContext>()
                                                       .UseInMemoryDatabase(databaseName: "BFinanceDb").Options;

    [Fact]
    public void GetAccountByIdWorks()
    {
      //arrange
      Account account = new()
      {
        AccountId = 1,
        AccountName = "CC",
        AccountType = "Credit Card",
        AccountBank = "Provident CU",
        AccountNumber = "5941"
      };

      using var context = new BFinanceContext(_options);
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();

      //act
      AccountService AcctSvc = new(context);
      context.Accounts.Add(account);

      context.SaveChanges();

      Account acct1 = AcctSvc.GetAccountById(1);
      Account acct2 = AcctSvc.GetAccountById(2);

      //assert
      Assert.Null(acct2);
      Assert.Equal(acct1, account);
    }

    [Fact]
    public void GetAllAccountsWorks()
    {
      //arrange
      Account account1 = new()
      {
        AccountId = 1,
        AccountName = "Checking",
        AccountType = "Debit Card",
        AccountBank = "Provident CU",
        AccountNumber = "5941"
      };
      Account account2 = new()
      {
        AccountId = 2,
        AccountName = "CC",
        AccountType = "Credit Card",
        AccountBank = "Provident CU",
        AccountNumber = "9235"
      };

      using var context = new BFinanceContext(_options);
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();

      List<Account> accounts = new();

      //act
      AccountService AcctSvc = new(context);
      context.Accounts.Add(account1);
      context.Accounts.Add(account2);

      context.SaveChanges();

      accounts = AcctSvc.GetAllAccounts();

      int count = accounts.Count();
      Assert.True(count == 2);
      Assert.Contains(account1, accounts);
      Assert.Contains(account2, accounts);
    }

    [Fact]
    public async Task AddAccountSuccessfullyAdds()
    {
      //arrange
      AccountMap account = new()
      {
        AccountName = "CC",
        AccountType = "Credit Card",
        AccountBank = "Provident CU",
        AccountNumber = "5941"
      };

      using var context = new BFinanceContext(_options);
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();
      
      bool successful = false;

      //act
      AccountService AcctSvc = new(context);
      successful = await AcctSvc.AddAccountAsync(account);

      context.SaveChanges();

      //assert
      Assert.True(successful);

      int count = await context.Accounts.CountAsync();
      Assert.Equal(1, count);

      Account actualAccount = context.Accounts.Where(acct => acct.AccountId == 1).FirstOrDefault();
      Assert.NotNull(actualAccount);
      Assert.Contains(actualAccount, context.Accounts);
      Account expectedAccount = new() 
      {
        AccountId = actualAccount.AccountId,
        AccountName = account.AccountName,
        AccountBank = account.AccountBank,
        AccountNumber = account.AccountNumber,
        AccountType = account.AccountType
      };
      Assert.Equal(actualAccount, expectedAccount);
    }

    [Fact]
    public async Task DeleteAccountSuccessfullyDeletes()
    {
      //arrange
      Account account = new()
      {
        AccountId = 1,
        AccountType = "Credit Card",
        AccountBank = "Provident CU",
        AccountNumber = "5941"
      };

      using var context = new BFinanceContext(_options);
      context.Database.EnsureDeleted();
      context.Database.EnsureCreated();

      AccountService AcctSvc = new(context);
      context.Accounts.Add(account);

      context.SaveChanges();

      //act
      bool successful = await AcctSvc.DeleteAccountAsync(1);

      //assert
      Assert.True(successful);
      Assert.False(context.Accounts.ToList().Any());
    }
  }//end Class
}//end Namespace
