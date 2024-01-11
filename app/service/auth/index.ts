import type {
  AccountVerificationModel,
  AwacashRegisterModel,
  ChangePasswordModel,
  ChangePinModel,
  LoginModel,
  PasswordRestModel,
  RegisterModel,
  ResetPasswordModel,
  SendAccountVerificationModel,
  SendPhoneVerificationModel,
  VerifyPasswordModel,
  VerifyPhoneModel,
} from 'authModels';
import type { APIResponse, SendAccountVerificationResponse } from 'api-response';

import { injectEndpoints } from '../config';

const authenticationEndpoints = injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<APIResponse<boolean>, ChangePasswordModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/change-password',
      }),
    }),
    changePin: builder.mutation<APIResponse<boolean>, ChangePinModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/change-pin',
      }),
    }),
    login: builder.mutation<UserResponse, LoginModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    register: builder.mutation<UserResponse, RegisterModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/register',
      }),
    }),
    registerAwacash: builder.mutation<UserResponse, AwacashRegisterModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/register-account-number',
      }),
    }),
    resetPassword: builder.mutation<APIResponse<string>, ResetPasswordModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/reset-password',
      }),
    }),
    sendAccountVerification: builder.mutation<
      APIResponse<SendAccountVerificationResponse>,
      SendAccountVerificationModel
    >({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/send-account-verification-code',
      }),
    }),
    sendPasswordVerification: builder.mutation<APIResponse<string>, PasswordRestModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/send-password-verification-code',
      }),
    }),
    sendPhoneVerification: builder.mutation<
      APIResponse<string>,
      SendPhoneVerificationModel
    >({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/send-phone-verification-code',
      }),
    }),
    verifyAccount: builder.mutation<APIResponse<string>, AccountVerificationModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/verify-account',
      }),
    }),
    verifyForgotPassword: builder.mutation<APIResponse<string>, VerifyPasswordModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/verify-forgot-password-code',
      }),
    }),
    verifyPhone: builder.mutation<APIResponse<string>, VerifyPhoneModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Auth/verify-phone',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: authEndpoints,
  useChangePasswordMutation,
  useChangePinMutation,
  useLoginMutation,
  useRegisterAwacashMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSendAccountVerificationMutation,
  useSendPasswordVerificationMutation,
  useSendPhoneVerificationMutation,
  useVerifyAccountMutation,
  useVerifyForgotPasswordMutation,
  useVerifyPhoneMutation,
} = authenticationEndpoints;
