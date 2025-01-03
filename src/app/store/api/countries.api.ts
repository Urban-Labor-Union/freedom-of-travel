import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { RootState } from '../app.store';

// TODO: @usamazansari: Add OpenAI API URL here
const BASE_URL = `https://restcountries.com`;

const baseQuery = fetchBaseQuery({
  prepareHeaders: async (headers, { getState }) => {
    // TODO: @usamazansari: Add token here
    const token = '';

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  baseUrl: BASE_URL,
});

export const countriesAPI = createApi({
  baseQuery,
  reducerPath: 'countries',
  endpoints: (build) => ({
    // TODO: @usamazansari: Add endpoint here referring https://restcountries.com/#endpoints
    getCountries: build.query({
      query: () => 'all',
    }),
  }),
});
