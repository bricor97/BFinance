using BFinanceBusiness;
using BFinanceModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BFinanceAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AccountController : ControllerBase
  {
    private readonly AccountService _accountSvc;
    
    public AccountController(IAccountService acctSvc)
    {
      this._accountSvc = (AccountService)acctSvc;
    }

    [HttpPost("[action]")]
    public async Task<bool> AddAccount([FromBody] AccountMap newAccount)
    {
      if (ModelState.IsValid)
        return await this._accountSvc.AddAccountAsync(newAccount);
      return false;
    }

    [HttpGet("[action]")]
    public List<Account> GetAllAccounts()
    {
      return this._accountSvc.GetAllAccounts();
    }

    [HttpGet("[action]/{accountId}")]
    public Account GetAccountById(int accountId)
    {
      return this._accountSvc.GetAccountById(accountId);
    }

    [HttpDelete("[action]/{accountId}")]
    public async Task<bool> DeleteAccountById(int accountId)
    {
      return await this._accountSvc.DeleteAccountAsync(accountId);
    }

    [HttpPut("[action]/{accountId}")]
    public async Task<bool> EditAccount([FromBody] Account editAccount, int accountId)
    {
      return await _accountSvc.EditAccountAsync(editAccount, accountId);
    }
  }
}
