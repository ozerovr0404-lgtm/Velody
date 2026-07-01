import { z } from "zod";

export const updateProfileSchema = z.object({
  stage_name: z.string().min(5),
  artist_position: z.array(z.coerce.number().int().positive()),
  genres: z.array(z.coerce.number().int().positive()),
  experience_years: z.coerce.number().int().min(0).max(100),
  city: z.string(),
  price_from: z.coerce.number().positive(),
  description: z.string().max(1000)
});