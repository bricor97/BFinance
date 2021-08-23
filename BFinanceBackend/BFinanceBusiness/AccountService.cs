using BFinanceDbContext;
using BFinanceModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BFinanceBusiness
{
  public class AccountService : IAccountService
  {
    internal readonly BFinanceContext _context;
    public AccountService(BFinanceContext context) { this._context = context; }

    /// <summary>
    /// Gets all accounts in the Database
    /// </summary>
    /// <returns>A list of Account objects</returns>
    public List<Account> GetAllAccounts()
    {
      List<Account> accounts = new();
      var dbResult = _context.Accounts.ToList();
      foreach (var res in dbResult)
      {
        Account newAccount = res;
        accounts.Add(newAccount);
      }
      return accounts;
    }
    /// <summary>
    /// Gets a single account based on the ID
    /// </summary>
    /// <param name="accountId">The ID of the account to get</param>
    /// <returns>An Account object</returns>
    public Account GetAccountById(int accountId)
    {
      return _context.Accounts.Where(acct => acct.AccountId == accountId).FirstOrDefault();
    }
    /// <summary>
    /// Adds an account record to Accounts table
    /// </summary>
    /// <param name="account">An AccountMap object to add to the database</param>
    /// <returns>A boolean task indicating whether or not the insert was successful</returns>
    public async Task<bool> AddAccountAsync(AccountMap newAccount)
    {
      Account account = new()
      {
        AccountId = 0,
        AccountType = newAccount.AccountType,
        AccountBank = newAccount.AccountBank,
        AccountNumber = newAccount.AccountNumber,
        AccountName = newAccount.AccountName
      };
      await _context.Accounts.AddAsync(account);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Removes a specific record from Accounts table
    /// </summary>
    /// <param name="accountId">The ID of the record to remove from the database</param>
    /// <returns>A boolean task indicating whether or not the deletion was successful</returns>
    public async Task<bool> DeleteAccountAsync(int accountId)
    {
      Account accountResult = _context.Accounts.Where(acct => acct.AccountId == accountId).FirstOrDefault();
      if (accountResult != null)  _context.Accounts.Remove(accountResult);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Edits an existing Account in the database
    /// </summary>
    /// <param name="editAccount">The Account object being edited</param>
    /// <param name="accountId">The ID of the account being edited</param>
    /// <returns>A boolean representing whether or not the update was successful</returns>
    public async Task<bool> EditAccountAsync(Account editAccount, int accountId)
    {
      var accountToEdit = _context.Accounts.Where(acct => acct.AccountId == accountId).FirstOrDefault();
      if (editAccount.AccountName != accountToEdit.AccountName) 
        accountToEdit.AccountName = editAccount.AccountName;
      if (editAccount.AccountType != accountToEdit.AccountType)
        accountToEdit.AccountType = editAccount.AccountType;
      if (editAccount.AccountBank != accountToEdit.AccountBank)
        accountToEdit.AccountBank = editAccount.AccountBank;
      if (editAccount.AccountNumber != accountToEdit.AccountNumber)
        accountToEdit.AccountNumber = editAccount.AccountNumber;
      _context.Accounts.Update(accountToEdit);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException exc) { return false; }
      catch (DbUpdateException exc) { return false; }
      return true;
    }
  }
}
