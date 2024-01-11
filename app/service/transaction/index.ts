import type { APIResponse, TransactionData, TransactionPaged } from 'api-response';
import type { TPModel } from 'transactionModel';

import { injectEndpoints } from '../config';

interface IDModel {
  transactionId: string;
}

const transactionEndpoint = injectEndpoints({
  endpoints: builder => ({
    getTransactionByID: builder.query<APIResponse<TransactionData>, IDModel>({
      query: ({ transactionId }) => `Transactions/${transactionId}`,
    }),
    getTransactions: builder.query<APIResponse<TransactionData[]>, void>({
      providesTags: ['Transactions'],
      query: () => 'Transactions',
    }),
    getTransactionsPaged: builder.query<APIResponse<TransactionPaged>, TPModel>({
      providesTags: ['Transactions'],
      query: args => {
        return {
          params: { ...args },
          url: 'Transactions/paged',
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: transactionEndpoints,
  useGetTransactionsQuery,
  useGetTransactionByIDQuery,
  useGetTransactionsPagedQuery,
} = transactionEndpoint;
