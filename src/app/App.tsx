import { Box, Stack } from '@mantine/core';
import * as React from 'react';
import { Form } from './components';
import type { FormType } from './types';

export function App() {
  const formSubmitCallback = React.useCallback((value: FormType) => {
    console.log(value);
  }, []);

  return (
    <Box className="grid h-screen place-content-center">
      <Stack align="center">
        <Form onSubmit={formSubmitCallback}></Form>
      </Stack>
    </Box>
  );
}
