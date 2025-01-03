import React, { useState, useEffect } from 'react';
import {
  Container,
  Select,
  Title,
  Space,
  Center,
  Button,
  Box,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

const HomePage = () => {
  const [nationality, setNationality] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const titleText = 'Welcome To Freedom of Travel.';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + titleText[index]);
      index += 1;
      if (index === titleText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  const nationalities = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ie', label: 'Ireland' },
    { value: 'in', label: 'India' },
  ];

  const handleNext = () => {
    notifications.show({
      title: `Note`,
      message: `You selected: ${nationality || 'No nationality selected'}`,
      position: 'top-right',
    });
  };

  return (
    <Container>
      <Center>
        <Box>
          <Title order={2}>{typedText}</Title>
        </Box>
      </Center>
      <Space h="xl" />
      <Box style={{ maxWidth: 400, margin: '0 auto' }}>
        <Select
          label="Select your nationality"
          placeholder="Choose nationality"
          data={nationalities}
          value={nationality}
          onChange={setNationality}
          searchable
          clearable
        />
        <Space h="md" />
        <Button
          onClick={handleNext}
          fullWidth
          size="md"
          variant="filled"
          disabled={!nationality}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
