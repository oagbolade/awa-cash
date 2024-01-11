interface User {
  accountNumber: string;
  address: string;
  bankName: string;
  bvn: string;
  city: string;
  createdBy: string;
  createdByIp: string;
  createdDate: Date;
  deviceId?: string;
  email: string;
  firstName: string;
  forceChangeOfPassword: boolean;
  fullName: string;
  id: string;
  isBvnConfirmed: boolean;
  isDeleted: boolean;
  isEmailConfirmed: boolean;
  isIdUploaded: boolean;
  isPhoneNumberConfirmed: boolean;
  lastName: string;
  middleName: string;
  modifiedBy: string;
  modifiedByIp: string;
  modifiedDate: Date;
  nextOfKinName?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinRelationship?: string;
  phoneNumber: string;
  profileImageUrl: string;
  state: string;
}

interface Response {
  user: User;
  token: string;
  isNewDevice: boolean;
}

interface UserResponse {
  isSuccessful: boolean;
  message: string;
  errors: string[];
  data: Response;
}

interface CustomerAccountData {
  accountNumber: string;
  accountStatus: string;
  accountType: 'SavingsOrCurrent' | 'Loan';
  availableBalance: string;
  ledgerBalance: string;
  withdrawableAmount: string;
}
