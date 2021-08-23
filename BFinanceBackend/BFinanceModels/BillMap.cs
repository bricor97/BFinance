using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFinanceModels
{
  public partial class BillMap
  {
    public string BillName { get; set; }
    public decimal PaymentAmount { get; set; }
    public string PaymentPeriod { get; set; }
    public string PaymentDueDate { get; set; }
    public int FromAccountId { get; set; }
  }
}
