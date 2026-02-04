// Stub file - LINE channel removed

import { z } from "zod";

export const LineConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
  })
  .optional();
