import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Country } from './countries.types';

const BASE_URL = `https://restcountries.com`;
const API_VERSION = 'v3.1';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/${API_VERSION}`,
});

export const countriesAPI = createApi({
  baseQuery,
  reducerPath: 'countries',
  endpoints: (build) => ({
    getCountryByName: build.query<Country, string>({
      query: (name) => `name/${name}`,
    }),
  }),
});

export const { useGetCountryByNameQuery, useLazyGetCountryByNameQuery } =
  countriesAPI;
