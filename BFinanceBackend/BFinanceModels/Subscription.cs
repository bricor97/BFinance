using System;
using System.Collections.Generic;

#nullable disable

namespace BFinanceModels
{
    public partial class Subscription
    {
        public int SubscriptionId { get; set; }
        public string SubscriptionName { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentPeriod { get; set; }
        public string PaymentDueDate { get; set; }
        public int FromAccountId { get; set; }

        public virtual Account FromAccount { get; set; }
    }
}
