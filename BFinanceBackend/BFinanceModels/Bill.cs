using System;
using System.Collections.Generic;

#nullable disable

namespace BFinanceModels
{
    public partial class Bill
    {
        public int BillId { get; set; }
        public string BillName { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentPeriod { get; set; }
        public string PaymentDueDate { get; set; }
        public int FromAccountId { get; set; }

        public virtual Account FromAccount { get; set; }
    }
}
