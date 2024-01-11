import type { APIResponse, GetBalanceData } from 'api-response';
import type {
  BVNModel,
  InitiateBVNModel,
  ProfileModel,
  UpgradeAccountModel,
  UploadDocumentsModel,
} from 'customerModel';

import { injectEndpoints } from '../config';

const customerEndpoint = injectEndpoints({
  endpoints: builder => ({
    getAccounts: builder.query<APIResponse<CustomerAccountData[]>, void>({
      providesTags: ['Accounts'],
      query: () => '/Customers/accounts',
    }),
    getBalance: builder.query<APIResponse<GetBalanceData>, void>({
      providesTags: ['Balance'],
      query: () => 'Customers/get-balance',
    }),
    getProfile: builder.query<APIResponse<User>, void>({
      providesTags: ['GetProfile'],
      query: () => 'Customers/me',
    }),
    initializeBVN: builder.mutation<APIResponse<string>, InitiateBVNModel>({
      query: body => ({
        body,
        method: 'POST',
        url: 'Customers/initialize-bvn-auth',
      }),
    }),
    upgradeAccount: builder.mutation<APIResponse<string>, Partial<UpgradeAccountModel>>({
      invalidatesTags: ['GetProfile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'Customers/next-of-kin',
      }),
    }),
    uploadDocuments: builder.mutation<APIResponse<string>, Partial<UploadDocumentsModel>>(
      {
        invalidatesTags: ['GetProfile'],
        query: body => ({
          body,
          method: 'POST',
          url: 'Customers/upgrade-account-doc',
        }),
      },
    ),
    uploadProfileImage: builder.mutation<APIResponse<string>, ProfileModel>({
      invalidatesTags: ['GetProfile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'Customers/profile-image',
      }),
    }),
    validateBVN: builder.mutation<APIResponse<string>, BVNModel>({
      invalidatesTags: ['GetProfile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'Customers/validate-bvn',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: customerEndpoints,
  useGetBalanceQuery,
  useUploadProfileImageMutation,
  useUploadDocumentsMutation,
  useInitializeBVNMutation,
  useUpgradeAccountMutation,
  useGetProfileQuery,
  useValidateBVNMutation,
  useGetAccountsQuery,
} = customerEndpoint;
