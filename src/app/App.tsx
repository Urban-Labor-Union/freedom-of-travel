import { Box, Button, Stack, Text } from '@mantine/core';
import { useInterval, useShallowEffect } from '@mantine/hooks';
import * as React from 'react';
import {  } from '@freedom-of-travel/store';

export function App() {
  const [seconds, setSeconds] = React.useState(0);
  const { start, stop, active, toggle } = useInterval(
    () =>
      setSeconds((s) => {
        return s + 1;
      }),
    1000
  );

  useShallowEffect(() => {
    start();
    return stop;
  }, []);

  return (
    <Box className="grid h-screen place-content-center">
      <Stack align="center">
        <Text>
          Page loaded <b>{seconds}</b> seconds ago
        </Text>
        <Button onClick={toggle} color={active ? 'red' : 'teal'}>
          {active ? 'Stop' : 'Start'} counting
        </Button>
      </Stack>
    </Box>
  );
}
