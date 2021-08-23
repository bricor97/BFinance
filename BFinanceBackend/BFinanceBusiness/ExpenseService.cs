using BFinanceDbContext;
using BFinanceModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFinanceBusiness
{
  public class ExpenseService: IExpenseService
  {
    internal readonly BFinanceContext _context;
    public ExpenseService(BFinanceContext context) { this._context = context; }

    /// <summary>
    /// Gets all subscriptions in the Database
    /// </summary>
    /// <returns>A list of Subscription objects</returns>
    public List<Subscription> GetAllSubscriptions()
    {
      List<Subscription> subscriptions = new();
      var dbResult = _context.Subscriptions.ToList();
      foreach (var res in dbResult)
      {
        Subscription newSubscription = res;
        newSubscription.FromAccount = res.FromAccount;
        subscriptions.Add(newSubscription);
      }
      return subscriptions;
    }
    /// <summary>
    /// Gets a single subscription based on the ID
    /// </summary>
    /// <param name="subscriptionId">The ID of the subscription to get</param>
    /// <returns>A Subscription object</returns>
    public Subscription GetSubscriptionById(int subscriptionId)
    {
      return _context.Subscriptions.Where(sub => sub.SubscriptionId == subscriptionId).FirstOrDefault();
    }
    /// <summary>
    /// Adds a subscription record to Subscriptions table
    /// </summary>
    /// <param name="newSubscription">A SubscriptionMap object to add to the database</param>
    /// <returns>A boolean task indicating whether or not the insert was successful</returns>
    public async Task<bool> AddSubscriptionAsync(SubscriptionMap newSubscription)
    {
      Subscription subscription = new()
      {
        SubscriptionId = 0,
        SubscriptionName = newSubscription.SubscriptionName,
        PaymentAmount = newSubscription.PaymentAmount,
        PaymentPeriod = newSubscription.PaymentPeriod,
        PaymentDueDate = newSubscription.PaymentDueDate,
        FromAccountId = newSubscription.FromAccountId
      };
      await _context.Subscriptions.AddAsync(subscription);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Removes a specific record from Subscriptions table
    /// </summary>
    /// <param name="subscriptionId">The ID of the record to remove from the database</param>
    /// <returns>A boolean task indicating whether or not the deletion was successful</returns>
    public async Task<bool> DeleteSubscriptionAsync(int subscriptionId)
    {
      Subscription subscriptionResult = _context.Subscriptions.Where(sub => sub.SubscriptionId == subscriptionId).FirstOrDefault();
      if (subscriptionResult != null) _context.Subscriptions.Remove(subscriptionResult);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Edits an existing Subscription in the database
    /// </summary>
    /// <param name="editSubscription">The Subscription object being edited</param>
    /// <param name="subscriptionId">The ID of the subscription being edited</param>
    /// <returns>A boolean representing whether or not the update was successful</returns>
    public async Task<bool> EditSubscriptionAsync(Subscription editSubscription, int subscriptionId)
    {
      var subscriptionToEdit = _context.Subscriptions.Where(sub => sub.SubscriptionId == subscriptionId).FirstOrDefault();
      if (editSubscription.SubscriptionName != subscriptionToEdit.SubscriptionName)
        subscriptionToEdit.SubscriptionName = editSubscription.SubscriptionName;
      if (editSubscription.PaymentAmount != subscriptionToEdit.PaymentAmount)
        subscriptionToEdit.PaymentAmount = editSubscription.PaymentAmount;
      if (editSubscription.PaymentDueDate != subscriptionToEdit.PaymentDueDate)
        subscriptionToEdit.PaymentDueDate = editSubscription.PaymentDueDate;
      if (editSubscription.PaymentPeriod != subscriptionToEdit.PaymentPeriod)
        subscriptionToEdit.PaymentPeriod = editSubscription.PaymentPeriod;
      if (editSubscription.FromAccountId != subscriptionToEdit.FromAccountId)
        subscriptionToEdit.FromAccountId = editSubscription.FromAccountId;
      _context.Subscriptions.Update(subscriptionToEdit);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException exc) { return false; }
      catch (DbUpdateException exc) { return false; }
      return true;
    }

    /// <summary>
    /// Gets all bills in the Database
    /// </summary>
    /// <returns>A list of Bill objects</returns>
    public List<Bill> GetAllBills()
    {
      List<Bill> bills = new();
      var dbResult = _context.Bills.ToList();
      foreach (var res in dbResult)
      {
        Bill newBill = res;
        bills.Add(newBill);
      }
      return bills;
    }
    /// <summary>
    /// Gets a single bill based on the ID
    /// </summary>
    /// <param name="billId">The ID of the bill to get</param>
    /// <returns>A Bill object</returns>
    public Bill GetBillById(int billId)
    {
      return _context.Bills.Where(bill => bill.BillId == billId).FirstOrDefault();
    }
    /// <summary>
    /// Adds a bill record to Bills table
    /// </summary>
    /// <param name="newBill">A BillMap object to add to the database</param>
    /// <returns>A boolean task indicating whether or not the insert was successful</returns>
    public async Task<bool> AddBillAsync(BillMap newBill)
    {
      Bill bill = new()
      {
        BillId = 0,
        BillName = newBill.BillName,
        PaymentAmount = newBill.PaymentAmount,
        PaymentPeriod = newBill.PaymentPeriod,
        PaymentDueDate = newBill.PaymentDueDate,
        FromAccountId = newBill.FromAccountId
      };
      await _context.Bills.AddAsync(bill);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Removes a specific record from Bills table
    /// </summary>
    /// <param name="billId">The ID of the record to remove from the database</param>
    /// <returns>A boolean task indicating whether or not the deletion was successful</returns>
    public async Task<bool> DeleteBillAsync(int billId)
    {
      Bill billResult = _context.Bills.Where(bill => bill.BillId == billId).FirstOrDefault();
      if (billResult != null) _context.Bills.Remove(billResult);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Edits an existing Bill in the database
    /// </summary>
    /// <param name="editBill">The Bill object being edited</param>
    /// <param name="billId">The ID of the bill being edited</param>
    /// <returns>A boolean representing whether or not the update was successful</returns>
    public async Task<bool> EditBillAsync(Bill editBill, int billId)
    {
      var billToEdit = _context.Bills.Where(bill => bill.BillId == billId).FirstOrDefault();
      if (editBill.BillName != billToEdit.BillName)
        billToEdit.BillName = editBill.BillName;
      if (editBill.PaymentAmount != billToEdit.PaymentAmount)
        billToEdit.PaymentAmount = editBill.PaymentAmount;
      if (editBill.PaymentDueDate != billToEdit.PaymentDueDate)
        billToEdit.PaymentDueDate = editBill.PaymentDueDate;
      if (editBill.PaymentPeriod != billToEdit.PaymentPeriod)
        billToEdit.PaymentPeriod = editBill.PaymentPeriod;
      if (editBill.FromAccountId != billToEdit.FromAccountId)
        billToEdit.FromAccountId = editBill.FromAccountId;
      _context.Bills.Update(billToEdit);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException exc) { return false; }
      catch (DbUpdateException exc) { return false; }
      return true;
    }

    /// <summary>
    /// Gets all auto transfers in the Database
    /// </summary>
    /// <returns>A list of AutoTransfer objects</returns>
    public List<AutoTransfer> GetAllAutoTransfers()
    {
      List<AutoTransfer> autoTransfers = new();
      var dbResult = _context.AutoTransfers.ToList();
      foreach (var res in dbResult)
      {
        AutoTransfer newAutoTransfer = res;
        autoTransfers.Add(newAutoTransfer);
      }
      return autoTransfers;
    }
    /// <summary>
    /// Gets a single auto transfer based on the ID
    /// </summary>
    /// <param name="autoTransferId">The ID of the auto transfer to get</param>
    /// <returns>An AutoTransfer object</returns>
    public AutoTransfer GetAutoTransferById(int autoTransferId)
    {
      return _context.AutoTransfers.Where(autoT => autoT.TransferId == autoTransferId).FirstOrDefault();

    }
    /// <summary>
    /// Adds an auto transfer record to AutoTransfers table
    /// </summary>
    /// <param name="newAutoTransfer">An AutoTransferMap object to add to the database</param>
    /// <returns>A boolean task indicating whether or not the insert was successful</returns>
    public async Task<bool> AddAutoTransferAsync(AutoTransferMap newAutoTransfer)
    {
      AutoTransfer autoTransfer = new()
      {
        TransferId = 0,
        TransferName = newAutoTransfer.TransferName,
        TransferAmount = newAutoTransfer.TransferAmount,
        TransferPeriod = newAutoTransfer.TransferPeriod,
        TransferDate = newAutoTransfer.TransferDate,
        FromAccountId = newAutoTransfer.FromAccountId,
        ToAccountId = newAutoTransfer.ToAccountId
      };
      await _context.AutoTransfers.AddAsync(autoTransfer);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Removes a specific record from AutoTransfers table
    /// </summary>
    /// <param name="autoTransferId">The ID of the record to remove from the database</param>
    /// <returns>A boolean task indicating whether or not the deletion was successful</returns>
    public async Task<bool> DeleteAutoTransferAsync(int autoTransferId)
    {
      AutoTransfer autoTransferResult = _context.AutoTransfers.Where(autoT => autoT.TransferId == autoTransferId).FirstOrDefault();
      if (autoTransferResult != null) _context.AutoTransfers.Remove(autoTransferResult);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException) { return false; }
      catch (DbUpdateException) { return false; }

      return true;
    }
    /// <summary>
    /// Edits an existing AutoTransfer in the database
    /// </summary>
    /// <param name="editAutoTransfer">The AutoTransfer object being edited</param>
    /// <param name="autoTransferId">The ID of the auto transfer being edited</param>
    /// <returns>A boolean representing whether or not the update was successful</returns>
    public async Task<bool> EditAutoTransferAsync(AutoTransfer editAutoTransfer, int autoTransferId)
    {
      var autoTransferToEdit = _context.AutoTransfers.Where(autoT => autoT.TransferId == autoTransferId).FirstOrDefault();
      if (editAutoTransfer.TransferName != autoTransferToEdit.TransferName)
        autoTransferToEdit.TransferName = editAutoTransfer.TransferName;
      if (editAutoTransfer.TransferAmount != autoTransferToEdit.TransferAmount)
        autoTransferToEdit.TransferAmount = editAutoTransfer.TransferAmount;
      if (editAutoTransfer.TransferDate != autoTransferToEdit.TransferDate)
        autoTransferToEdit.TransferDate = editAutoTransfer.TransferDate;
      if (editAutoTransfer.TransferPeriod != autoTransferToEdit.TransferPeriod)
        autoTransferToEdit.TransferPeriod = editAutoTransfer.TransferPeriod;
      if (editAutoTransfer.FromAccountId != autoTransferToEdit.FromAccountId)
        autoTransferToEdit.FromAccountId = editAutoTransfer.FromAccountId;
      if (editAutoTransfer.ToAccountId != autoTransferToEdit.ToAccountId)
        autoTransferToEdit.ToAccountId = editAutoTransfer.ToAccountId;
      _context.AutoTransfers.Update(autoTransferToEdit);

      try { await _context.SaveChangesAsync(); }
      catch (DbUpdateConcurrencyException exc) { return false; }
      catch (DbUpdateException exc) { return false; }
      return true;
    }
  }
}
