import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getProfile, updateProfile } from "../api";
import { queryClient } from "@/lib/react-query-client";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

type ProfileResponse = {
  data: any;
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async () => getProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  return useMutation<ProfileResponse, AxiosError<ApiError>, { name: string }>({
    mutationFn: ({ name }) => updateProfile({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
