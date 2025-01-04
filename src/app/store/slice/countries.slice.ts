import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IAppState } from '../app.store';

type ICountriesState = IAppState['countries'];

const initialState: ICountriesState = [];

const reducers = {
  /**
   * Sets the countries information in the state.
   *
   * @param {ICountriesState} state - the current state
   * @param {PayloadAction<ICountriesState['user']>} action - the payload action containing the countries data
   */
  setCountries: (
    state: ICountriesState,
    action: PayloadAction<ICountriesState>
  ) => {
    state = action.payload;
  },
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers,
});

export const { setCountries } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
