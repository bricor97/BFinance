export interface GetAccount {
  accountId: number;
  accountType: string;
  accountBank: string;
  accountNumber: string;
  accountName: string;
}

export interface PostAccount {
  accountType: string;
  accountBank: string;
  accountNumber: string;
  accountName: string;
}
