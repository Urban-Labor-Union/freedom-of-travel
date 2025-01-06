import { z } from 'zod';

export const AppResponseSchema = z.object({
  eVisa: z.boolean(),
  visaOnArrival: z.boolean(),
  visaFree: z.boolean(),
  visaRequired: z.boolean(),
  entryProhibited: z.boolean(),
  lastUpdated: z.string(),
});

export type AppResponseType = z.infer<typeof AppResponseSchema>;