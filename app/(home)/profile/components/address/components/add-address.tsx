"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateAddress } from "../hooks";
import { AddAddressSchema } from "@/schemas/address";

export default function AddAddress() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      primary: false,
      latitude: 0,
      longitude: 0,
    },
  });
  const { mutate: createAddress, isPending } = useCreateAddress();

  const handleSubmit = async (payload: z.infer<typeof AddAddressSchema>) => {
    form.clearErrors("root");
    // createAddress(payload, {
    //   onSuccess: () => {
    //     router.push("/dashboard");
    //   },
    //   onError: (error) => {
    //     const errorMessage =
    //       error.response?.data?.message ||
    //       error.response?.data ||
    //       "Invalid credentials";

    //     form.setError("root", {
    //       type: "server",
    //       message: errorMessage,
    //     });
    //     toast.error(errorMessage);
    //   },
    // });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Address</CardTitle>
        <CardDescription>
          Add your address to get started right away
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="street"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Street</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="email/phone"
                    type="text"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="City"
                    type="text"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="State"
                    type="text"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Country"
                    type="text"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="pincode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Zip Code</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Pin Code"
                    type="text"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {form.formState.errors.root && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
