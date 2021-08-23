import { GetAccount } from "./account";

export interface GetSubscription {
  subscriptionId: number;
  subscriptionName: string;
  paymentAmount: number;
  paymentPeriod: string;
  paymentDueDate: string;
  fromAccountId: number;
  fromAccount: GetAccount;
}

export interface PostSubscription {
  subscriptionName: string;
  paymentAmount: number;
  paymentPeriod: string;
  paymentDueDate: string;
  fromAccountId: number;
}
