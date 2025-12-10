import apiClient from "@/lib/api-client";
import { AddAddressSchema } from "@/schemas/address";
import z from "zod";

export type AddAddressPayload = z.infer<typeof AddAddressSchema>;
export type UpdateAddressPayload = z.infer<typeof AddAddressSchema.partial>;

export type AddressResponse = {
  success: boolean;
};

type deleteAddressProps = {
  addressId: string;
};

type updateAddressProps = {
  addressId: string;
  payload: UpdateAddressPayload;
};

export const createAddress = (payload: AddAddressPayload) =>
  apiClient
    .post<AddressResponse>("/users/me/addresses", payload)
    .then((res) => res.data);

export const updateAddress = ({ addressId, payload }: updateAddressProps) =>
  apiClient
    .put<AddressResponse>(`/users/me/addresses/${addressId}`, payload)
    .then((res) => res.data);

export const deleteAddress = ({ addressId }: deleteAddressProps) =>
  apiClient
    .delete<AddressResponse>(`/users/me/addresses/${addressId}`)
    .then((res) => res.data);
