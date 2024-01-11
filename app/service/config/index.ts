import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import baseUrl from './settings';

import { AppStateType } from 'store/store';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.url,
    prepareHeaders: (header, { getState }) => {
      const token = (getState() as AppStateType).auth.token;
      token && header.set('Authorization', `Bearer ${token}`);

      header.set('AppId', process.env.APP_ID);
      header.set('AppKey', process.env.APP_KEY);

      return header;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['GetProfile', 'Balance', 'Accounts', 'Transactions'],
});

export const {
  reducer: apiReducer,
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,
  injectEndpoints,
  endpoints,
} = api;
