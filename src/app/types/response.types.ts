import { z } from 'zod';

export const AppResponseSchema = z.object({
  eVisa: z.boolean({
    description:
      'True if eVisa is available for the country for the passport(s) and currently valid visa with the user',
  }),
  visaOnArrival: z.boolean({
    description:
      'True if visa on arrival is available for the country for the passport(s) and currently valid visa with the user',
  }),
  visaFree: z.boolean({
    description:
      'True if the user has visa free access to the country for the passport(s) and currently valid visa with the user',
  }),
  visaRequired: z.boolean({
    description:
      'True if visa is required for the country for the passport(s) and currently valid visa with the user. This flag should be false if either eVisa or visaOnArrival is true',
  }),
  entryProhibited: z.boolean({
    description:
      'True if entry is prohibited for the country for the passport(s) and currently valid visa with the user',
  }),
  lastUpdated: z.date({
    description: 'Date when the data was last updated as an ISO 8601 string',
  }),
  notes: z.string({
    description: 'This should be populated if there are any notes for the user for the given combination of passport(s) and visas the user holds',
  }),
});

export type AppResponseType = z.infer<typeof AppResponseSchema>;
