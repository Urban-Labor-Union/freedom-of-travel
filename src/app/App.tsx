import { Box, Button, Stack, Text } from '@mantine/core';
import { useInterval, useShallowEffect } from '@mantine/hooks';
import * as React from 'react';
import { useLazyGetAllCountriesCountQuery } from '@freedom-of-travel/store';

export function App() {
  const [count, { data, isSuccess, isError, isLoading, isFetching }] =
    useLazyGetAllCountriesCountQuery();

  const getCountCallback = React.useCallback(async () => {
    try {
      await count({});
    } catch (error) {
      console.error(error);
    }
  }, [count]);

  return (
    <Box className="grid h-screen place-content-center">
      <Stack align="center">
        {isLoading || isFetching ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Unable to get count of countries</Text>
        ) : isSuccess ? (
          <Text>
            There are <b>{data}</b> countries in the world.
          </Text>
        ) : null}
        <Button loading={isLoading || isFetching} onClick={getCountCallback}>
          Count countries
        </Button>
      </Stack>
    </Box>
  );
}
