"use client";

import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useGetCurrentUser, useUpdateProfile } from "../hooks";
import { UpdateProfileSchema } from "@/schemas/profile";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const { data: user } = useGetCurrentUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const handleSubmit = (payload: z.infer<typeof UpdateProfileSchema>) => {
    form.clearErrors("root");

    updateProfile(payload, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        router.push("/profile");
      },
      onError: (error) => {
        const message =
          error.response?.data?.message || "Failed to update profile";

        form.setError("root", {
          type: "server",
          message,
        });

        toast.error(message);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>
          Change how your name appears on your profile
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Your full name"
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
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Name</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
