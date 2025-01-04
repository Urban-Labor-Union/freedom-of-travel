import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { countriesAPI, type Country } from './api';
import { countriesReducer } from './slice';

export type IAppState = {
  countriesSlice: { countries: Country[] };
};

// NOTE: @usamazansari: Add reducers here
const combinedReducers = combineReducers({
  [countriesAPI.reducerPath]: countriesAPI.reducer,
  countriesSlice: countriesReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      countriesAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof combinedReducers>
> = useSelector;
