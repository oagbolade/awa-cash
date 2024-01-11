import type { AwacashRegisterModel, RegisterModel } from 'authModels';

type UserParams = Pick<
  RegisterModel,
  'password' | 'confirmPassword' | 'email' | 'phoneNumber' | 'hash'
>;

type AwacashUserParams = Pick<
  AwacashRegisterModel,
  | 'password'
  | 'confirmPassword'
  | 'email'
  | 'phoneNumber'
  | 'hash'
  | 'accountId'
  | 'firstName'
  | 'lastName'
>;

interface AwacashUserAccountTokenParams extends AwacashUserParams {
  accountHash: string;
}

type PinParams = Omit<RegisterModel, 'confirmPin' | 'pin'>;
type ConfirmPinParams = Omit<RegisterModel, 'confirmPin'>;

type AwacashPinParams = Omit<AwacashRegisterModel, 'confirmPin' | 'pin'>;
type AwacashConfirmPinParams = Omit<AwacashRegisterModel, 'confirmPin'>;

export type OnboardRoutes = {
  Onboard: undefined;
};

export type AuthRoutes = {
  Welcome: undefined;

  AwacashAccountNo: undefined;
  AwacashValidateAccountOTP: {
    accountId: string;
    hash: string;
    accountNumber: string;
    firstName: string;
    lastName: string;
  };
  AwacashValidateNumberOTP: AwacashUserAccountTokenParams;
  AwacashCreatePin: AwacashPinParams;
  AwacashConfirmPin: AwacashConfirmPinParams;
  AwacashSignUp: { accountId: string; hash: string; firstName: string; lastName: string };
  AwacashPersonalDetails: AwacashUserParams;
  AwacashSignUpSuccess: undefined;

  SignUp: undefined;
  ValidateOTP: UserParams;
  PersonalDetails: UserParams;
  CreatePin: PinParams;
  ConfirmPin: ConfirmPinParams;

  Login: undefined;
  RequestResetOTP: undefined;
  ResetPassword: { email: string; hash: string };
  ValidateResetOTP: { hash: string; email: string };

  AuthSuccess: { type: 'reset' | 'signup' };
};
