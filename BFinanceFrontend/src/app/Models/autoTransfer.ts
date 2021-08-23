export interface GetAutoTransfer {
  transferId: number;
  transferName: string;
  transferAmount: number;
  transferPeriod: string;
  transferDate: string;
  fromAccountId: number;
  toAccountId: number;
}

export interface PostAutoTransfer {
  transferName: string;
  transferAmount: number;
  transferPeriod: string;
  transferDate: string;
  fromAccountId: number;
  toAccountId: number;
}
