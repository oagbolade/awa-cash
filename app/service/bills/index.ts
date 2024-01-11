import type {
  APIResponse,
  BillData,
  GetBillerData,
  PaymentItemData,
  SPAData,
  ValidateData,
} from 'api-response';
import type { BCModel, BuyAirtimeModel, PIModel, SPAModel, VCModel } from 'bill-Model';

import { injectEndpoints } from '../config';

const billEndpoint = injectEndpoints({
  endpoints: builder => ({
    buyAirtime: builder.mutation<APIResponse<SPAData>, BuyAirtimeModel>({
      invalidatesTags: ['Balance', 'Accounts', 'Transactions', 'GetProfile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'BillPayments/air-time',
      }),
    }),
    getAirtimeBillers: builder.query<APIResponse<BillData[]>, void>({
      query: () => 'BillPayments/get-airtime-billers',
    }),
    getBillers: builder.query<APIResponse<GetBillerData>, void>({
      query: () => 'BillPayments/get-billers',
    }),
    getBillersCategory: builder.query<APIResponse<BillData[]>, BCModel>({
      query: ({ categoryId }) => `BillPayments/get-billers-category/${categoryId}`,
    }),
    getDataBillers: builder.query<APIResponse<BillData[]>, void>({
      query: () => 'BillPayments/get-data-billers',
    }),
    getInternetBillers: builder.query<APIResponse<BillData[]>, void>({
      query: () => 'BillPayments/get-internet-billers',
    }),
    getPaymentItem: builder.query<APIResponse<PaymentItemData[]>, PIModel>({
      query: ({ billerId }) => `BillPayments/get-payment-items/${billerId}`,
    }),
    payBills: builder.mutation<APIResponse<SPAData>, SPAModel>({
      invalidatesTags: ['Balance', 'Accounts', 'Transactions', 'GetProfile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'BillPayments/bill-payment',
      }),
    }),
    sendPaymentAdvice: builder.mutation<APIResponse<SPAData>, SPAModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'BillPayments/send-payment-advice',
      }),
    }),
    validateCustomer: builder.mutation<APIResponse<ValidateData>, VCModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'BillPayments/validate-customer',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: billEndpoints,
  useGetBillersQuery,
  useGetAirtimeBillersQuery,
  useGetBillersCategoryQuery,
  useGetPaymentItemQuery,
  useSendPaymentAdviceMutation,
  useValidateCustomerMutation,
  useBuyAirtimeMutation,
  usePayBillsMutation,
  useGetDataBillersQuery,
  useGetInternetBillersQuery,
} = billEndpoint;
