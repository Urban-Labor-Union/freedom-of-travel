import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { RootState } from '../app.store';

// TODO: @usamazansari: Using Ollama locally by `docker-compose up`
const BASE_URL = '';  // http://localhost:11434/api/generate

const baseQuery = fetchBaseQuery({
  prepareHeaders: async (headers, { getState }) => {
    // TODO: @usamazansari: Add token here
    const token = '';

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  baseUrl: BASE_URL,
});

export const openAIApi = createApi({
  baseQuery,
  reducerPath: 'openaiAPI',
  // TODO: @usamazansari: Add endpoints here
  endpoints: (build) => ({
    // POST http://localhost:11434/api/generate with body as below
    // {
    //   "model": "llama3.2",
    //   "prompt": "I hold a US passport and I wish to travel to France. Please provide me with the visa requirements in a JSON format.",
    //   "stream": false,
    //
    // With OpenAI integration, we would not require to pass the format below.
    // We should simply create a typescript type and integrate with zod:
    // https://github.com/openai/openai-node/blob/master/helpers.md#integrate-with-zod
    //
    //   "format": {
    //     "type": "object",
    //     "properties": {
    //       "eVisa": {
    //         "type": "boolean",
    //         "description": "True if eVisa is required"
    //       },
    //       "visaOnArrival": {
    //         "type": "boolean",
    //         "description": "True if visa on arrival is available"
    //       },
    //       "visaRequired": {
    //         "type": "boolean",
    //         "description": "True if a stamped visa is required"
    //       },
    //       "visaFreeEntry": {
    //         "type": "boolean",
    //         "description": "True if visa is not required"
    //       },
    //       "entryProhibited": {
    //         "type": "boolean",
    //         "description": "True if entry is prohibited"
    //       },
    //       "lastUpdatedOn": {
    //         "type": "string",
    //         "description": "The timestamp of when this information was last updated."
    //       }
    //     },
    //     "required": [
    //       "eVisa",
    //       "onArrival",
    //       "visaFreeAccess",
    //       "visaRequired",
    //       "entryProhibited"
    //     ]
    //   }
    // }

  }),
});
