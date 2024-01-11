import type {} from 'authModels';
import type { APIResponse, GetBanksData, IBTData, NEData } from 'api-response';
import type { IBTModel, LTModel, NEModel, TFModel } from 'transferModels';

import { injectEndpoints } from '../config';

const transferEndpoints = injectEndpoints({
  endpoints: builder => ({
    getBanks: builder.query<APIResponse<GetBanksData[]>, void>({
      query: () => 'Transfers/get-banks',
    }),
    getTransferFee: builder.query<APIResponse<number>, TFModel>({
      query: ({ amount, type }) => `Transfers/transaction-fee/${amount}/${type}`,
    }),
    interBank: builder.mutation<APIResponse<IBTData>, IBTModel>({
      invalidatesTags: ['Balance', 'Accounts', 'Transactions'],
      query: body => ({
        body,
        method: 'POST',
        url: 'Transfers/inter-bank-transfer',
      }),
    }),
    interNameEnquiry: builder.mutation<APIResponse<NEData>, NEModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Transfers/inter-bank-name-enquiry',
      }),
    }),
    localNameEnquiry: builder.mutation<APIResponse<NEData>, string>({
      query: phoneNumber => ({
        method: 'GET',
        timeout: 120_000,
        url: `Transfers/local-transfer-name-enquiry/${phoneNumber}`,
      }),
    }),
    localTransfer: builder.mutation<APIResponse<string>, LTModel>({
      invalidatesTags: ['Balance', 'Accounts', 'Transactions'],
      query: body => ({
        body,
        method: 'POST',
        url: 'Transfers/local-transfer',
      }),
    }),
    transactionFee: builder.mutation<APIResponse<number>, TFModel>({
      query: ({ amount, type }) => ({
        method: 'POST',
        url: `Transfers/transaction-fee/${amount}/${type}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: transEndpoints,
  useGetBanksQuery,
  useInterBankMutation,
  useLocalTransferMutation,
  useGetTransferFeeQuery,
  useInterNameEnquiryMutation,
  useLocalNameEnquiryMutation,
  useTransactionFeeMutation,
} = transferEndpoints;
