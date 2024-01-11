import * as Yup from 'yup';

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{5,}$/;
// const addressRegExr = /^\d{"1","3"}[A-Za-z]+$/;

const password = Yup.string()
  .matches(
    passwordRegExr,
    'Password must contain at least 5 characters, including upper & lower case and numbers',
  )
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('Password');

const password2 = Yup.string().required('Please enter your password').label('Password');

const amount = Yup.string().required('Enter an amount').label('Amount');

const details = Yup.string().required('Enter transaction details').label('Details');

const email = Yup.string()
  .required('Please enter your email')
  .email('Email is invalid')
  .label('Email');

export const accountNumber = Yup.string()
  .required('Please enter account Number')
  .min(10, 'Account number must be at least 10 digits long')
  .label('Account number');

export const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  .required('Please confirm your password');

export const phoneNumber = Yup.string()
  .required('Please enter your phone number')
  .min(10, 'Phone number must be at least 10 digits long')
  .label('Phone Number');

export const otp = Yup.string()
  .required('Please enter your OTP')
  .min(5, 'OTP must be at least 5 digits long')
  .label('OTP');

export const firstName = Yup.string()
  .required('Please input your legal first name')
  .min(2, 'First name must be at least 2 digits long')
  .label('First Name');

export const lastName = Yup.string()
  .required('Please input your legal last name')
  .min(2, 'Last name must be at least 2 digits long')
  .label('Last Name');

export const middleName = Yup.string()
  .required('Please input your legal middle name')
  .min(2, 'Middle name must be at least 2 digits long')
  .label('Middle Name');

// const name = Yup.string()
//   .required('Please input your legal full name')
//   .min(2, 'Name must be at least 2 digits long')
//   .label('Name');

export const emailValidationSchema = Yup.object().shape({
  email,
});

export const loginValidationSchema = Yup.object().shape({
  email,
  password: password2,
});

export const signUpValidationSchema = Yup.object().shape({
  confirmPassword,
  email,
  password,
  phoneNumber,
});

export const otpValidationSchema = Yup.object().shape({
  otp,
});

export const personalDetailsValidationSchema = Yup.object().shape({
  firstName,
  lastName,
  middleName,
});

export const verifyEmailValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Please enter your OTP')
    .min(6, 'OTP must be at least 6 digits long')
    .label('OTP'),
});

export const address = Yup.string()
  // .matches(addressRegExr, 'Address must start with a number')
  .required('Please enter address');

export const resetPasswordValidationSchema = Yup.object().shape({
  confirmPassword,
  password,
});

export const accountNumberValidationSchema = Yup.object().shape({
  accountNumber,
});

export const verifyBVNValidationSchema = Yup.object().shape({
  bvn: Yup.string()
    .required('Please enter your BVN')
    .min(11, 'BVN must be at least 11 digits long')
    .label('BVN'),
  dateOfBirth: Yup.string()
    .required('Please select your Date of birth')
    .label('Date of Birth'),
});

const legalName = (label: string) =>
  Yup.string()
    .required('Please input your next of kin legal full name')
    .min(2, 'Name must be at least 2 digits long')
    .label(label);

export const personalInformationValidationSchema = Yup.object().shape({
  currentAddress: address,
  currentCity: Yup.string().required('Please enter City'),
  currentCountry: Yup.string().required('Please enter Country'),
  nextOfKinAddress: address,
  nextOfKinEmailAddress: email,
  nextOfKinName: legalName('Next of Kin'),
  nextOfKinPhoneNumber: phoneNumber,
  relationshipWithNextOfKin: Yup.string()
    .required('What is your relationship with the next of kin?')
    .label('Relationship with the next of kin'),
});

export const imageValidationSchema = Yup.object().shape({
  image: Yup.string().required('Please upload an image').label('Image'),
});

export const utilityBillValidationSchema = Yup.object().shape({
  utility: Yup.string().required('Please upload Utility Bill').label('Utility Bill'),
});

export const idValidationSchema = Yup.object().shape({
  id: Yup.string().required('Please Select an ID to upload').label('Valid ID'),
  type: Yup.object().required('Please Select a ID type').label('Valid ID'),
});

export const addressValidationSchema = Yup.object().shape({
  address,
  city: Yup.string().required('Please enter City'),
  state: Yup.string().required('Please enter State'),
});

export const awacashTransferValidationSchema = Yup.object().shape({
  accountNumber,
  amount,
  details,
});

export const myAccountValidationSchema = Yup.object().shape({
  account: Yup.object().required('Please Select an account').label('Transfer to'),
  amount,
  details,
});

export const bankTransferValidationSchema = Yup.object().shape({
  accountNumber,
  amount,
  bank: Yup.object().required('Please select a Bank').label('Bank'),
  details,
});

export const changePinValidationSchema = Yup.object().shape({
  confirmNewPin: Yup.string().required('Confirm Pin').length(4).label('Confirm Pin'),
  newPin: Yup.string().required('New Pin').length(4).label('New Pin'),
  oldPin: Yup.string().required('Current Pin').length(4).label('Current Pin'),
});

export const changePasswordValidationSchema = Yup.object().shape({
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Please confirm your password'),
  newPassword: Yup.string()
    .matches(
      passwordRegExr,
      'Password must contain at least 8 alphanumeric characters. [Including upper and lowercase]',
    )
    .required('Please enter your new password')
    .min(8, 'Password must be at least 8 characters long')
    .label('New Password'),
  oldPassword: Yup.string()
    .required('Please enter your old password')
    .label('Old Password'),
});

export const billValidationSchema = Yup.object().shape({
  customerId: Yup.string().required('Input required').label(''),
  email: Yup.string()
    .required('Please enter your email')
    .email('Email is invalid')
    .label('Email'),
  phoneNumber: Yup.string().required('Phone number required').label('Phone Number'),
  product: Yup.object().required('Product is required').label('Product'),
});

export const airtimeValidationSchema = Yup.object().shape({
  // amount,
  network: Yup.object().required('Please select a network').label('network'),
  package: Yup.object().required('Please select a package').label('Package'),
  phoneNumber: Yup.string().required('Phone number required').label('Mobile'),
});

export const dataValidationSchema = Yup.object().shape({
  network: Yup.object().required('Please select a network').label('network'),
  package: Yup.object().required('Please select a package').label('Package'),
  phoneNumber: Yup.string().required('Enter a phone number').label('Mobile'),
});
