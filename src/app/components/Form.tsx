import { Box, Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';
import type { FormType } from '../types';
import { CountriesDropdown } from './common';

export function Form({
  value,
  onSubmit,
}: {
  value?: FormType;
  onSubmit: (value: FormType) => void;
}) {
  const form = useForm<FormType>({
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
      <Box miw={450}>
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
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
}
