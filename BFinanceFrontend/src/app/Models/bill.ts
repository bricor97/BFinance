export interface GetBill {
  billId: number;
  billName: string;
  paymentAmount: number;
  paymentPeriod: string;
  paymentDueDate: string;
  fromAccountId: number;
}

export interface PostBill {
  billName: string;
  paymentAmount: number;
  paymentPeriod: string;
  paymentDueDate: string;
  fromAccountId: number;
}
