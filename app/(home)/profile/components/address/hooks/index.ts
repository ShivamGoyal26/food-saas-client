import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import {
  AddAddressPayload,
  AddressResponse,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../api";
import { queryKeys } from "@/lib/query-keys";

type ApiError = {
  message: string;
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressResponse, AxiosError<ApiError>, AddAddressPayload>({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddressResponse,
    AxiosError<ApiError>,
    { addressId: string; payload: AddAddressPayload }
  >({
    mutationFn: ({ addressId, payload }) =>
      updateAddress({ addressId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressResponse, AxiosError<ApiError>, string>({
    mutationFn: (addressId) => deleteAddress({ addressId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
