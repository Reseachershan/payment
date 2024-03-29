import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseUrl';

console.log('BASE_URL', BASE_URL)
export const emptySplitApi = createApi({
  reducerPath: 'serverApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        console.log('token', token);
        headers.set('authorization', `${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['GetUserProfile', 'Banks', 'Transactions'],
})