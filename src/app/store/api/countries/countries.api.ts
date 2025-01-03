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
    getAllCountries: build.query<Country[], any>({
      query: () => 'all',
    }),
    getAllCountriesCount: build.query<number, any>({
      query: () => 'all',
      transformResponse: (response: Country[]) => response.length,
    }),
  }),
});

export const {
  useGetAllCountriesCountQuery,
  useGetAllCountriesQuery,
  useLazyGetAllCountriesCountQuery,
  useLazyGetAllCountriesQuery,
} = countriesAPI;
