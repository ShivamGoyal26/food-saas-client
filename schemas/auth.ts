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

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),

    email: z
      .string()
      .email({ message: "Invalid email address" })
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, { message: "Invalid Indian phone number" })
      .optional()
      .or(z.literal("")),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .superRefine((data, ctx) => {
    const hasEmail = !!data.email;
    const hasPhone = !!data.phone;

    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        path: ["email"], // 👈 show error near input
        message: "Email or phone number is required",
        code: z.ZodIssueCode.custom,
      });

      ctx.addIssue({
        path: ["phone"],
        message: "Email or phone number is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });
