using BFinanceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFinanceBusiness
{
  public interface IAccountService
  {
    public Account GetAccountById(int accountId);
    public List<Account> GetAllAccounts();
    public Task<bool> AddAccountAsync(AccountMap newAccount);
    public Task<bool> DeleteAccountAsync(int accountId);
    public Task<bool> EditAccountAsync(Account editAccount, int accountId);
  }
}
