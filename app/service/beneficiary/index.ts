import type { APIResponse, BeneficiaryData } from 'api-response';

import { injectEndpoints } from '../config';

const beneficiaryEndpoint = injectEndpoints({
  endpoints: builder => ({
    getBeneficiaries: builder.query<APIResponse<BeneficiaryData[]>, void>({
      query: () => 'Beneficiaries',
    }),
    getBeneficiariesByID: builder.query<APIResponse<BeneficiaryData>, string>({
      query: id => `Beneficiaries/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  endpoints: beneficiaryEndpoints,
  useGetBeneficiariesQuery,
  useGetBeneficiariesByIDQuery,
} = beneficiaryEndpoint;
