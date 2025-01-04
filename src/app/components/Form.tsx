import { Button, Group, MultiSelect, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useShallowEffect } from '@mantine/hooks';
import * as React from 'react';
import type { FormType } from '../types';

export function Form({
  value,
  onSubmit,
}: {
  value?: FormType;
  onSubmit: (value: FormType) => void;
}) {
  const form = useForm<FormType>({
    initialValues: {
      myPassport: '',
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
      <Group align="flex-end">
        <MultiSelect
          searchable
          label="I hold passport(s) of"
          withAsterisk
        ></MultiSelect>
        <MultiSelect
          searchable
          label="I hold visa(s) of"
          description={
            <Text c="dimmed" size="xs">
              Please enter only tourist visa(s) you currently hold
            </Text>
          }
        ></MultiSelect>
        <Select searchable label="I want to travel to" withAsterisk></Select>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
