declare module 'authModels' {
  export interface LoginModel {
    email: string;
    password: string;
  }

  export interface RegisterModel {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    pin: string;
    confirmPin: string;
    hash: string;
  }

  export interface AwacashRegisterModel {
    accountId: string;
    confirmPassword: string;
    confirmPin: string;
    email: string;
    firstName: string;
    hash: string;
    lastName: string;
    middleName: string;
    password: string;
    phoneNumber: string;
    pin: string;
  }

  export interface ResetPasswordModel {
    email: string;
    confirmPassword: string;
    password: string;
    hash: string;
  }

  export interface PasswordRestModel {
    email: string;
  }

  export interface AccountVerificationModel {
    code: string;
    hash: string;
  }

  export interface SendAccountVerificationModel {
    accountNumber: string;
  }

  export interface ChangePasswordModel {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }

  export interface ChangePinModel {
    oldPin: string;
    newPin: string;
    confirmNewPin: string;
  }
  export interface SendPhoneVerificationModel {
    phoneNumber: string;
  }

  export interface VerifyPasswordModel {
    code: string;
    hash: string;
  }

  export interface VerifyPhoneModel {
    phoneNumber: string;
    code: string;
    hash: string;
  }
}

declare module 'api-response' {
  export interface ErrorResponse {
    data?: unknown;
    isSuccessful: boolean;
    message: string;
    errors: string[];
  }

  export interface APIResponse<T> {
    isSuccessful: boolean;
    message: string;
    errors: string[];
    data: T;
  }

  export interface IBTData {
    code: string;
    transactionReference: string;
  }

  export interface NEData {
    code: string;
    name: string;
  }

  export interface GetBanksData {
    bankCode: string;
    bankName: string;
  }

  //Create Savings Data
  export interface CSData {
    balance: number;
    customerId: string;
    deductionFrequency: number;
    deductionaAmount: number;
    duration: number;
    interestRate: number;
    maturityDate: Date;
    reason: string;
    savingType: number;
    startDate: Date;
    targetAmount: number;
  }

  //Savings Configuration Data
  export interface SCData {
    createdBy: string;
    createdByIp: string;
    createdDate: Date;
    id: string;
    isDeleted: boolean;
    modifiedBy?: string;
    modifiedByIp?: string;
    modifiedDate?: string;
    planDescription: string;
    planDuration: number;
    planInterestRate: number;
    planName: string;
    savingType: number;
    status: boolean;
  }

  export interface PromoData {
    createdBy: string;
    createdByIp: string;
    createdDate: Date;
    description: string;
    hasImage: boolean;
    id: string;
    imageUrl: string;
    isDeleted: boolean;
    modifiedBy?: string;
    modifiedByIp?: string;
    modifiedDate?: Date;
    status: number;
    title: string;
  }

  export interface GetBalanceData {
    fullName: string;
    balance: number;
  }

  export interface TransactionData {
    amount: number;
    billerId?: string;
    billerName?: string;
    createdBy?: string;
    createdByIp?: string;
    createdDate: Date;
    creditAccountName: string;
    creditAccountNumber: string;
    currency: string;
    customerId: string;
    debitAccountName: string;
    debitAccountNumber: string;
    destinationBankCode?: string;
    destinationBankName?: string;
    fee: number;
    id: string;
    isDeleted: boolean;
    modifiedBy?: string;
    modifiedByIp?: string;
    modifiedDate?: Date;
    narration: string;
    paymentItemCode?: string;
    paymentItemName?: string;
    paymentReference?: string;
    recordType?: 1 | 2;
    responseCode?: string;
    sessionId?: string;
    status?: string;
    transactionReference: string;
    transactionType?: string;
  }

  export interface TransactionPaged {
    results: TransactionData[];
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
  }

  export interface BeneficiaryData {
    accountName: string;
    accountNumber: string;
    bankCode?: string;
    bankName: string;
    beneficaryType: number;
    biller?: string;
    createdBy: string;
    createdByIp: string;
    createdDate: Date;
    customerId: string;
    id: string;
    isDeleted: boolean;
    meterNumber?: string;
    modifiedBy?: string;
    modifiedByIp?: string;
    modifiedDate?: Date;
    phoneNumber?: string;
    preferedName?: string;
    status: number;
  }

  export interface CardConfigData {
    issuerName: string;
    price: number;
    cardType: number;
    status: number;
    id: string;
    createdBy: string;
    createdByIp: string;
    createdDate: Date;
    modifiedBy?: string;
    modifiedByIp?: string;
    modifiedDate?: Date;
    isDeleted: boolean;
  }

  export interface SendAccountVerificationResponse {
    accountId: string;
    hash: string;
    lastName: string;
    firstName: string;
  }

  export interface GetBillerData {
    categorys: {
      categoryid: string;
      categoryname: string;
      categorydescription: string;
    }[];
  }

  export interface PaymentItemData {
    amount: string;
    billerid: string;
    categoryid: string;
    code: string;
    currencyCode: string;
    currencySymbol: string;
    isAmountFixed: boolean;
    itemCurrencySymbol: string;
    itemFee: string;
    paydirectItemCode: string;
    paymentCode: string;
    paymentitemid: string;
    paymentitemname: string;
    pictureId: string;
    sortOrder: string;
  }

  export interface ValidateData {
    amount: string;
    amountType: string;
    amountTypeDescription: string;
    customerId: string;
    fullName: string;
    paymentCode: string;
    responseCode: string;
    responseDescription: string;
  }

  export interface BillData {
    amountType: string;
    billerid: string;
    billername: string;
    categorydescription: string;
    categoryid: string;
    categoryname: string;
    currencyCode: string;
    currencySymbol: string;
    customSectionUrl: string;
    customerfield1: string;
    customerfield2: string;
    logoUrl: string;
    narration: string;
    networkId: string;
    paydirectInstitutionId: string;
    paydirectProductId: string;
    productCode: string;
    quickTellerSiteUrlName: string;
    riskCategoryId: string;
    shortName: string;
    supportemail: string;
    surcharge: string;
    type: string;
    url: string;
  }

  //SendPaymentAdviceData
  export interface SPAData {
    additionalInfo: AdditionalInfo;
    miscData: string;
    phcnTokenDetails: string;
    rechargePIN: string;
    responseCode: string;
    responseCodeGrouping: string;
    responseMessage: string;
    transactionRef: string;
  }

  interface AdditionalInfo {
    amountGenerated?: string | null;
    configureToken?: string | null;
    customerAddress: string;
    debtAmount?: string | null;
    debtCoverage?: string | null;
    debtRemaining?: string | null;
    freeUnits?: string | null;
    receiptNo?: string | null;
    resetToken?: string | null;
    tariff?: string | null;
    tariffBaseRate?: string | null;
    tax?: string | null;
    units?: string | null;
  }
}

declare module 'transferModels' {
  //InterBank
  export interface IBTModel {
    debitAccount: string;
    addAsBeneficary: boolean;
    bankCode: string;
    creditAccount: string;
    amount: number;
    transactionPin: string;
    narration: string;
    transactionReference: string;
  }

  //LocalBank
  export interface LTModel {
    debitAccount: string;
    addAsBeneficary: boolean;
    creditAccount: string;
    amount: number;
    transactionPin: string;
    narration: string;
    transactionReference: string;
  }

  export interface NEModel {
    bankCode: string;
    accountNumber: string;
  }

  export interface TFModel {
    amount: number;
    type: 1 | 2 | 3 | 4 | 5;
  }
}

declare module 'savingsModel' {
  export interface CreateSavingsModel {
    reason: string;
    targetAmount: number;
    deductionFrequency: number;
    savingConfigId: string;
  }
}

declare module 'transactionModel' {
  export interface TPModel {
    TransactionType?: number;
    RecordType?: number;
    AccountNumber?: string;
    PageIndex?: number;
    PageSize?: number;
    GlobalSearch?: string;
    StartDate?: Date;
    EndDate?: Date;
    OrderBY?: string;
    ByDescending?: boolean;
  }
}

declare module 'disputeModel' {
  export interface DisputeModel {
    accountNumber: string;
    email: string;
    phoneNumber: string;
    amount: number;
    transactionDate: Date;
    comment: string;
  }
}

declare module 'customerModel' {
  export interface BalanceModel {
    fullName: string;
    balance: number;
  }

  export interface ProfileModel {
    profileBase64: string;
  }

  export interface BVNModel {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    accessToken: string;
  }

  export interface InitiateBVNModel {
    bvn: string;
  }

  export interface UpgradeAccountModel {
    address: string;
    state: string;
    city: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhoneNumber: string;
    country: string;
    nextOfKinEmail: string;
    nextOfKinAddress: string;
  }

  export interface UploadDocumentsModel {
    idBase64: string;
    idType: number;
    utilityBase64: string;
    idNumber: string;
  }
}

declare module 'cardRequestModel' {
  // CardRequestModel
  export interface CRModel {
    cardName: string;
    cardType: number;
    deliveryAddress: string;
    cardConfigId: string;
  }
}

declare module 'bill-Model' {
  // PaymentItem
  export interface PIModel {
    billerId: string;
  }

  //BillerCategory
  export interface BCModel {
    categoryId: string;
  }

  //ValidateCustomerModel
  export interface VCModel {
    customerId: string;
    paymentCode: string;
  }

  //PaymentAdvice
  export interface SPAModel {
    accountNumber: string;
    paymentCode: string;
    customerId: string;
    customerMobile: string;
    customerEmail: string;
    amount: string;
    pin: string;
  }

  export interface BuyAirtimeModel {
    accountNumber: string;
    paymentCode: string;
    customerMobile: string;
    amount: string;
    pin: string;
  }
}
