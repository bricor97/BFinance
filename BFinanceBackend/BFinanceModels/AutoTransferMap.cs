using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFinanceModels
{
  public partial class AutoTransferMap
  {
    public string TransferName { get; set; }
    public decimal TransferAmount { get; set; }
    public string TransferPeriod { get; set; }
    public string TransferDate { get; set; }
    public int FromAccountId { get; set; }
    public int ToAccountId { get; set; }
  }
}
