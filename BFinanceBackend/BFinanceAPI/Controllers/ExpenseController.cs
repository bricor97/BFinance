using BFinanceBusiness;
using BFinanceModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BFinanceAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ExpenseController : ControllerBase
  {
    private readonly ExpenseService _expenseSvc;

    public ExpenseController(IExpenseService expenseSvc)
    {
      this._expenseSvc = (ExpenseService)expenseSvc;
    }

    // SUBSCRIPTION //
    [HttpGet("[action]")]
    public List<Subscription> GetAllSubscriptions()
    {
      return this._expenseSvc.GetAllSubscriptions();
    }

    [HttpGet("[action]/{subscriptionId}")]
    public Subscription GetSubscriptionById(int subscriptionId)
    {
      return this._expenseSvc.GetSubscriptionById(subscriptionId);
    }

    [HttpPost("[action]")]
    public async Task<bool> AddSubscription([FromBody] SubscriptionMap newSubscription)
    {
      if (ModelState.IsValid)
        return await this._expenseSvc.AddSubscriptionAsync(newSubscription);
      return false;
    }

    [HttpDelete("[action]/{subscriptionId}")]
    public async Task<bool> DeleteSubscriptionById(int subscriptionId)
    {
      return await this._expenseSvc.DeleteSubscriptionAsync(subscriptionId);
    }

    [HttpPut("[action]/{subscriptionId}")]
    public async Task<bool> EditSubscription([FromBody] Subscription editSubscription, int subscriptionId)
    {
      return await this._expenseSvc.EditSubscriptionAsync(editSubscription, subscriptionId);
    }

    // BILL //
    [HttpGet("[action]")]
    public List<Bill> GetAllBills()
    {
      return this._expenseSvc.GetAllBills();
    }

    [HttpGet("[action]/{billId}")]
    public Bill GetBillById(int billId)
    {
      return this._expenseSvc.GetBillById(billId);
    }

    [HttpPost("[action]")]
    public async Task<bool> AddBill([FromBody] BillMap newBill)
    {
      if (ModelState.IsValid)
        return await this._expenseSvc.AddBillAsync(newBill);
      return false;
    }

    [HttpDelete("[action]/{billId}")]
    public async Task<bool> DeleteBillById(int billId)
    {
      return await this._expenseSvc.DeleteBillAsync(billId);
    }

    [HttpPut("[action]/{billId}")]
    public async Task<bool> EditBill([FromBody] Bill editBill, int billId)
    {
      return await this._expenseSvc.EditBillAsync(editBill, billId);
    }

    // AUTO TRANSFERS //
    [HttpGet("[action]")]
    public List<AutoTransfer> GetAllAutoTransfers()
    {
      return this._expenseSvc.GetAllAutoTransfers();
    }

    [HttpGet("[action]/{autoTransferId}")]
    public AutoTransfer GetAutoTransferById(int autoTransferId)
    {
      return this._expenseSvc.GetAutoTransferById(autoTransferId);
    }

    [HttpPost("[action]")]
    public async Task<bool> AddAutoTransfer([FromBody] AutoTransferMap newAutoTransfer)
    {
      if (ModelState.IsValid)
        return await this._expenseSvc.AddAutoTransferAsync(newAutoTransfer);
      return false;
    }

    [HttpDelete("[action]/{autoTransferId}")]
    public async Task<bool> DeleteAutoTransferById(int autoTransferId)
    {
      return await this._expenseSvc.DeleteAutoTransferAsync(autoTransferId);
    }

    [HttpPut("[action]/{autoTransferId}")]
    public async Task<bool> EditAutoTransfer([FromBody] AutoTransfer editBill, int autoTransferId)
    {
      return await this._expenseSvc.EditAutoTransferAsync(editBill, autoTransferId);
    }
  }
}
