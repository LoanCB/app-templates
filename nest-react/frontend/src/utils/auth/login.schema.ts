import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Ce champ est obligatoire")
    .email("Veuillez renseigner une adresse mail valide"),
  password: z.string().min(1, "Ce champ est obligatoire"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
