import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { countriesAPI, openAIApi } from './api';

export type IAppState = object;

// NOTE: @usamazansari: Add reducers here
const combinedReducers = combineReducers({
  [openAIApi.reducerPath]: openAIApi.reducer,
  [countriesAPI.reducerPath]: countriesAPI.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      openAIApi.middleware,
      countriesAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof combinedReducers>
> = useSelector;
