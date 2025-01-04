import { useAppSelector, type Country } from '@freedom-of-travel/store';
import {
  Avatar,
  Combobox,
  Group,
  Highlight,
  Pill,
  PillsInput,
  ScrollArea,
  Stack,
  Text,
  useCombobox,
  type MultiSelectProps,
} from '@mantine/core';
import * as React from 'react';

export function CountriesDropdown({
  onChange,
  label = 'Select country',
  description = 'Please select the country',
  placeholder = 'Search countries',
  withAsterisk = false,
  value = [],
}: MultiSelectProps & {
  onChange: (value: string[]) => void;
}) {
  const countries = useAppSelector((state) => state.countriesSlice.countries);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<Country[]>(
    countries.filter((item) => value.includes(item.name.common))
  );
  const [selectedSet] = React.useState<Set<string>>(
    new Set(selected.map((item) => item.name.common))
  );

  const handleValueSelect = React.useCallback(
    (val: string) => {
      const country = countries.find((item) => item.name.common === val);
      if (country) {
        setSelected((current) => {
          const s = [...current, country];
          onChange(s.map((item) => item.name.common));
          return s;
        });
      }
      selectedSet.add(val);
      setSearch('');
    },
    [countries, onChange, selectedSet]
  );

  const handleValueRemove = React.useCallback(
    (val?: Country) => {
      if (val) {
        setSelected((current) => {
          const s = current.filter((v) => v.name.common !== val.name.common);
          onChange(s.map((item) => item.name.common));
          return s;
        });
        selectedSet.delete(val.name.common);
      }
    },
    [onChange, selectedSet]
  );

  const values = React.useMemo(
    () =>
      selected.map((item) => (
        <Pill
          key={item.name.common}
          withRemoveButton
          onRemove={() => handleValueRemove(item)}
        >
          {item.name.common}
        </Pill>
      )),
    [handleValueRemove, selected]
  );

  const options = React.useMemo(
    () =>
      countries
        .filter((item) =>
          item.name.common.toLowerCase().includes(search.trim().toLowerCase())
        )
        .filter((item) => !selectedSet.has(item.name.common))
        .map((item) => (
          <Combobox.Option
            value={item.name.common}
            key={item.name.common}
            active={selected.includes(item)}
          >
            <Group gap="sm" wrap="nowrap">
              <Avatar src={item.flags.svg} alt={item.name.common} />
              <Stack gap={0}>
                <Highlight highlight={search} truncate>
                  {item.name.common}
                </Highlight>
                <Text c="dimmed" size="xs">
                  {item.continents.join(', ')}
                </Text>
              </Stack>
            </Group>
          </Combobox.Option>
        )),
    [countries, search, selected, selectedSet]
  );

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput
          label={label}
          description={description}
          onClick={() => combobox.openDropdown()}
          withAsterisk={withAsterisk}
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(selected[selected.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found...</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
