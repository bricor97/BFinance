using System;
using System.Collections.Generic;

#nullable disable

namespace BFinanceModels
{
    public partial class Account
    {
        public Account()
        {
            AutoTransferFromAccounts = new HashSet<AutoTransfer>();
            AutoTransferToAccounts = new HashSet<AutoTransfer>();
            Bills = new HashSet<Bill>();
            Subscriptions = new HashSet<Subscription>();
        }

        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string AccountBank { get; set; }
        public string AccountNumber { get; set; }

        public virtual ICollection<AutoTransfer> AutoTransferFromAccounts { get; set; }
        public virtual ICollection<AutoTransfer> AutoTransferToAccounts { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<Subscription> Subscriptions { get; set; }
    }
}
