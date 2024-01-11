import { NavigatorScreenParams } from '@react-navigation/native';

export type AppRoutes = {
  TabStack: NavigatorScreenParams<TabRoutes>;
  HomeStack: NavigatorScreenParams<HomeRoutes>;
  MoreStack: NavigatorScreenParams<MoreRoutes>;
  KYCStack: NavigatorScreenParams<KYCRoutes>;
};

export type TabRoutes = {
  Home: undefined;
  Savings: undefined;
  Loans: undefined;
  More: undefined;
};

export type HomeRoutes = {
  Transfer: NavigatorScreenParams<TransferRoutes>;
  Bill: NavigatorScreenParams<BillRoutes>;
  Transactions: undefined;
  Notifications: undefined;
};

export type MoreRoutes = {
  More: undefined;
  MoreSuccess: { message: string };

  UpgradeAccount: undefined;
  LevelTwo: undefined;
  LevelThree: undefined;
  PersonalInfo: undefined;
  Security: undefined;
  RequestChangeOTP: { operationType: string };
  ValidateChangeOTP: undefined;
  ChangePassword: undefined;
  BiometricSettings: undefined;
  ChangePin: undefined;
};

export type KYCRoutes = {
  AccountSetup: undefined;
  VerifyBVN: undefined;
  KYCSuccess: { message: string };
  Address: undefined;
  ValidID: {
    utilityBill: string;
  };
  TakeSelfie: undefined;
  UtilityBill: undefined;
  VerifyBVNWeb: {
    uri: string;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
  };
};

export type TransferRoutes = {
  TransferMethod: undefined;
  TransferSuccess: {
    accountName: string;
    amount: string;
    accountNumber: string;
    date: number;
    transactionReference: string;
    bankName: string;
    narration: string;
    account: string;
  };
  TransferReceipt: {
    accountName: string;
    amount: string;
    accountNumber: string;
    date: number;
    transactionReference: string;
    bankName: string;
    narration: string;
    account: string;
  };
  Beneficiary: undefined;

  AwacashSelectAccount?: {
    beneficiary?: {
      name: string;
      accountNumber: string;
    };
  };
  AwacashTransfer: {
    account: string;
    beneficiary?: {
      name: string;
      accountNumber: string;
    };
  };
  AwacashTransferConfirmation: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    details: string;
    beneficiary: boolean;
  };
  AwacashTransferPin: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    details: string;
    beneficiary: boolean;
  };

  MyAccountSelect: undefined;
  MyAccountTransfer: {
    account: string;
  };
  MyAccountConfirm: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    details: string;
  };
  MyAccountPin: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    details: string;
  };

  BankSelectAccount?: {
    beneficiary?: {
      name: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
    };
  };
  BankTransfer: {
    account: string;
    beneficiary?: {
      name: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
    };
  };
  BankConfirmation: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bank: {
      name: string;
      code: string;
    };
    details: string;
    beneficiary: boolean;
  };
  BankPin: {
    account: string;
    amount: string;
    accountNumber: string;
    accountName: string;
    bank: {
      name: string;
      code: string;
    };
    details: string;
    beneficiary: boolean;
  };
};

export type BillRoutes = {
  Biller: undefined;
  BillerCategory: {
    categoryId: string;
    categoryName: string;
    description: string;
  };
  BillerDetails: {
    bill: string;
    billerId: string;
    fields: { fieldLabel: string; fieldName: string };
    type: 3 | 4; //3 for airtime, 4 for bills
  };
  BillSelectAccount: {
    amount: string;
    customerEmail: string;
    customerId: string;
    customerMobile: string;
    paymentCode: string;
    type: 3 | 4;
    label: string;
    fullName: string;
  };
  BillerConfirmation: {
    account: string;
    amount: string;
    customerEmail: string;
    customerId: string;
    customerMobile: string;
    paymentCode: string;
    type: 3 | 4;
    label: string;
    fullName: string;
  };
  BillPin: {
    account: string;
    amount: string;
    customerEmail: string;
    customerId: string;
    customerMobile: string;
    paymentCode: string;
    type: 3 | 4; //3 for airtime, 4 for bills
    label: string;
    fullName: string;
  };
  BillReceipt: {
    account: string;
    amount: string;
    customerEmail: string;
    customerId: string;
    customerMobile: string;
    label: string;
    tRef: string;
    resMessage: string;
  };
  BillSuccess: {
    account: string;
    amount: string;
    customerEmail: string;
    customerId: string;
    customerMobile: string;
    label: string;
    tRef: string;
    resMessage: string;
  };
  AirtimeOrData: undefined;
};
