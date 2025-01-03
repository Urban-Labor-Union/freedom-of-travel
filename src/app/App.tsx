import { Box, Stack, Text } from '@mantine/core';
import HomePage from './features/home/homePage';

export function App() {
  return (
    <Box className="grid h-screen place-content-center">
      <Stack align="center">
        <HomePage />
      </Stack>
    </Box>
  );
}
