import z from "zod";

export const AddAddressSchema = z.object({
  street: z
    .string({ message: "Street is required" })
    .min(1, "Street cannot be empty"),

  city: z
    .string({ message: "City is required" })
    .min(1, "City cannot be empty"),

  state: z.string().optional(),

  country: z.string().optional(),

  pincode: z
    .string({ message: "Pincode is required" })
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^[0-9]{6}$/, "Pincode must contain only numbers"),

  primary: z.boolean().optional(),

  latitude: z
    .number({ message: "Latitude is required" })
    .refine(
      (val) => val >= -90 && val <= 90,
      "Latitude must be between -90 and 90"
    ),

  longitude: z
    .number({ message: "Longitude is required" })
    .refine(
      (val) => val >= -180 && val <= 180,
      "Longitude must be between -180 and 180"
    ),
});
