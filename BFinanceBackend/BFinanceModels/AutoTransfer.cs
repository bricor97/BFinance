using System;
using System.Collections.Generic;

#nullable disable

namespace BFinanceModels
{
    public partial class AutoTransfer
    {
        public int TransferId { get; set; }
        public string TransferName { get; set; }
        public decimal TransferAmount { get; set; }
        public string TransferPeriod { get; set; }
        public string TransferDate { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }

        public virtual Account FromAccount { get; set; }
        public virtual Account ToAccount { get; set; }
    }
}
