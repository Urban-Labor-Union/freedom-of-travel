import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import * as React from 'react';
import {
  AppResponseSchema,
  type AppResponseType,
  type AppFormType,
} from '../types';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1/',

  // required but ignored
  apiKey: 'ollama',
  dangerouslyAllowBrowser: true,
});

function generatePrompt(value: AppFormType) {
  const concatenatedPassports = [
    value.myPassports.slice(0, value.myPassports.length - 2).join(', '),
    value.myPassports.slice(-2),
  ]
    .filter(Boolean)
    .join(' and ');

  const passportString =
    value.myPassports.length > 1
      ? `I hold passports from ${concatenatedPassports}`
      : `I hold passport from ${concatenatedPassports}`;

  const concatenatedVisas = value.myVisas?.length
    ? [
        value.myVisas.slice(0, value.myVisas.length - 2).join(', '),
        value.myVisas.slice(-2),
      ]
        .filter(Boolean)
        .join(' and ')
    : '';

  const visaString = concatenatedVisas
    ? `I have valid visas for ${concatenatedVisas}`
    : '';

  const destinationString = `I wish to travel to ${value.destination}`;

  const postPrompt = `What are the visa requirements? Please provide me an answer in JSON format.`;

  return [passportString, visaString, destinationString, postPrompt]
    .filter(Boolean)
    .join('. ');
}

export function useOpenAIChatCompletionsCreate() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);
  const [data, setData] = React.useState<AppResponseType | null>(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const model = 'llama3.2';

  const createChatCompletion = React.useCallback(
    async (value: AppFormType) => {
      setIsLoading(true);
      const prompt = generatePrompt(value);
      try {
        const response = await client.chat.completions.create({
          model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          stream: false,
          response_format: zodResponseFormat(AppResponseSchema, ''),
        });
        const message = response?.choices[0]?.message?.content ?? '{}';
        setData(JSON.parse(message));
        setIsSuccess(true);
      } catch (e) {
        setError(e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [model]
  );

  return [
    createChatCompletion,
    { data, error, isLoading, isError, isSuccess },
  ] as const;
}
