import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Country } from './countries.types';

const BASE_URL = `https://restcountries.com`;
const API_VERSION = 'v3.1';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/${API_VERSION}`,
});

export const countriesAPI = createApi({
  baseQuery,
  reducerPath: 'countriesAPI',
  endpoints: (build) => ({
    getCountryByName: build.query<Country, string>({
      query: (name) => `name/${name}`,
    }),
    getAllCountriesForSelectDropdown: build.query<Country[], void>({
      query: () => `all?fields=name,cca2,cca3,currencies,maps,flags,continents`,
    }),
  }),
});

export const {
  useGetCountryByNameQuery,
  useLazyGetCountryByNameQuery,
  useGetAllCountriesForSelectDropdownQuery,
  useLazyGetAllCountriesForSelectDropdownQuery,
} = countriesAPI;
