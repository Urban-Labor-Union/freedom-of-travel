import { Box, LoadingOverlay, Stack, Text } from '@mantine/core';
import * as React from 'react';
import { Form } from './components';
import type { FormType } from './types';
import {
  useAppDispatch,
  useGetAllCountriesForSelectDropdownQuery,
} from './store';
import { setCountries } from './store/slice';

export function App() {
  const dispatch = useAppDispatch();
  const {
    data: countriesData,
    isError,
    isLoading,
  } = useGetAllCountriesForSelectDropdownQuery();

  const formSubmitCallback = React.useCallback((value: FormType) => {
    console.log(value);
  }, []);

  React.useEffect(() => {
    if (countriesData) {
      dispatch(setCountries(countriesData));
    }
  }, [countriesData, dispatch]);

  return (
    <Box className="grid h-screen place-content-center">
      {isError ? (
        <Text>Error initializing app!</Text>
      ) : (
        <Stack align="center" pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Form onSubmit={formSubmitCallback}></Form>
        </Stack>
      )}
    </Box>
  );
}
