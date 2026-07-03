import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  stage_name: z.string().min(5),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/),
  password: z.string().min(12).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/)
});

export const me = z.object({

});