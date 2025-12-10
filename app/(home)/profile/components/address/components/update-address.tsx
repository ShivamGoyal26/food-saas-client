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
import { AddAddressSchema } from "@/schemas/address";
import { useUpdateAddress } from "../hooks";

type Props = {
  address: {
    _id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    primary: boolean;
    latitude: number;
    longitude: number;
  };
  onClose?: () => void;
};

export default function UpdateAddress({ address, onClose }: Props) {
  const form = useForm({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      primary: address.primary,
      latitude: address.latitude,
      longitude: address.longitude,
    },
  });

  const { mutate: updateAddress, isPending } = useUpdateAddress();

  const handleSubmit = (payload: z.infer<typeof AddAddressSchema>) => {
    form.clearErrors("root");

    updateAddress(
      {
        addressId: address._id,
        payload: payload,
      },
      {
        onSuccess: () => {
          toast.success("Address updated successfully");
          onClose?.();
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data ||
            "Failed to update address";

          form.setError("root", {
            type: "server",
            message: errorMessage,
          });

          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Address</CardTitle>
        <CardDescription>Update your address information</CardDescription>
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
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
                  <Input {...field} aria-invalid={fieldState.invalid} />
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
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
