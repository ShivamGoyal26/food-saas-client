import z from "zod";

export const LoginSchema = z.object({
  username: z.string().superRefine((val, ctx) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhone = /^[6-9]\d{9}$/.test(val);

    if (!isEmail && !isPhone) {
      ctx.addIssue({
        code: "custom",
        message: "Username must be a valid email or phone number",
      });
    }
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, { error: "Invalid Indian phone number" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
