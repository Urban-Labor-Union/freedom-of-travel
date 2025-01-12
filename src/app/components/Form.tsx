import { Box, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import type { AppFormType } from '../types';
import { CountriesDropdown } from './common';

export function Form({
  value,
  onSubmit,
}: {
  value?: AppFormType;
  onSubmit: (value: AppFormType) => void;
}) {
  const form = useForm<AppFormType>({
    initialValues: {
      myPassports: [],
      myVisas: [],
      destination: '',
    },
  });

  useShallowEffect(() => {
    if (value) {
      form.setInitialValues(value);
    }
  }, [value]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Box className="grid justify-center gap-4">
        <CountriesDropdown
          label="I hold passport(s) of"
          onChange={(value) => form.setFieldValue('myPassports', value)}
          withAsterisk
        />
        <CountriesDropdown
          label="I hold visa(s) of"
          onChange={(value) => form.setFieldValue('myVisas', value)}
          description={
            <Text c="dimmed" size="xs">
              Please enter only tourist visa(s) you currently hold
            </Text>
          }
        />
        <CountriesDropdown
          label="I want to travel to"
          withAsterisk
          onChange={(value) => form.setFieldValue('destination', value[0])}
        />
        <Button type="submit" leftSection={<IconSearch size={16} />}>
          Explore
        </Button>
      </Box>
    </form>
  );
}
