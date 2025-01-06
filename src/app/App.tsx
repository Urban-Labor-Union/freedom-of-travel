import { Box, Loader, LoadingOverlay, Stack, Text } from '@mantine/core';
import * as React from 'react';
import { Form } from './components';
import type { AppFormType } from './types';
import {
  useAppDispatch,
  useGetAllCountriesForSelectDropdownQuery,
} from './store';
import { setCountries } from './store/slice';
import { useOpenAIChatCompletionsCreate } from './helpers';

export function App() {
  const dispatch = useAppDispatch();
  const {
    data: countriesData,
    isError: countriesError,
    isLoading: countriesLoading,
  } = useGetAllCountriesForSelectDropdownQuery();

  const [
    createChatCompletion,
    {
      data: aiResponse,
      isLoading: aiLoading,
      isSuccess: aiSuccess,
      isError: aiError,
      error: aiResponseError,
    },
  ] = useOpenAIChatCompletionsCreate();

  const formSubmitCallback = React.useCallback(
    async (value: AppFormType) => {
      try {
        await createChatCompletion(value);
      } catch (error) {
        console.error(error);
      }
    },
    [createChatCompletion]
  );

  React.useEffect(() => {
    if (countriesData) {
      dispatch(setCountries(countriesData));
    }
  }, [countriesData, dispatch]);

  return (
    <Box className="grid h-screen place-content-center">
      {countriesError ? (
        <Text>Error initializing app!</Text>
      ) : (
        <Stack align="center" pos="relative">
          <LoadingOverlay
            visible={countriesLoading}
            loaderProps={{
              children: (
                <Stack align="center">
                  <Loader />
                  <Text>Initializing</Text>
                </Stack>
              ),
            }}
          />
          <Form onSubmit={formSubmitCallback}></Form>
          {aiLoading ? (
            <Text>Thinking...</Text>
          ) : aiError ? (
            <Stack>
              <Text>Error thinking!</Text>
              <Text>{(aiResponseError as { message: string })?.message}</Text>
            </Stack>
          ) : aiSuccess ? (
            aiResponse && <Text>{JSON.stringify(aiResponse)}</Text>
          ) : null}
        </Stack>
      )}
    </Box>
  );
}
