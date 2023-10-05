import { z } from 'zod';

export const voterSchema = z.object({
  _id: z.string(),
  birthday: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  sex: z.string(),
});

export type Voter = z.infer<typeof voterSchema>;
