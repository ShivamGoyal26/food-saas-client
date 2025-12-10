import z from "zod";

export const UpdateMeSchema = z.object({
  name: z.string().optional(),
  email: z.email({ error: "Invalid email" }).optional(),
});
