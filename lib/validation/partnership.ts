import { z } from "zod";

export const inviteSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Enter their email")
    .email("Enter a valid email address"),
});

export type InviteValues = z.infer<typeof inviteSchema>;
