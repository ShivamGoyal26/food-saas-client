import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import {
  AddAddressPayload,
  AddressResponse,
  createAddress,
  deleteAddress,
  updateAddress,
} from "../api";

type ApiError = {
  message: string;
};

const ADDRESS_QUERY_KEY = ["addresses"];

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressResponse, AxiosError<ApiError>, AddAddressPayload>({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
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
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<AddressResponse, AxiosError<ApiError>, string>({
    mutationFn: (addressId) => deleteAddress({ addressId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY });
    },
  });
};
