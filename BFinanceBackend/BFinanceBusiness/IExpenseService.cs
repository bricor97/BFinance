using BFinanceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFinanceBusiness
{
  public interface IExpenseService
  {
    public List<Subscription> GetAllSubscriptions();
    public Subscription GetSubscriptionById(int subscriptionId);
    public Task<bool> DeleteSubscriptionAsync(int subscriptionId);
    public Task<bool> AddSubscriptionAsync(SubscriptionMap newSubscription);
    public Task<bool> EditSubscriptionAsync(Subscription editSubscription, int subscriptionId);

    public List<Bill> GetAllBills();
    public Bill GetBillById(int billId);
    public Task<bool> DeleteBillAsync(int billId);
    public Task<bool> AddBillAsync(BillMap newBill);
    public Task<bool> EditBillAsync(Bill editBill, int billId);

    public List<AutoTransfer> GetAllAutoTransfers();
    public AutoTransfer GetAutoTransferById(int autoTransferId);
    public Task<bool> DeleteAutoTransferAsync(int autoTransferId);
    public Task<bool> AddAutoTransferAsync(AutoTransferMap newAutoTransfer);
    public Task<bool> EditAutoTransferAsync(AutoTransfer editAutoTransfer, int autoTransferId);
  }
}
