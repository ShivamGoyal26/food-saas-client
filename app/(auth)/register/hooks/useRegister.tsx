import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { RegisterSchema } from "@/schemas/auth";
import { z } from "zod";
import { queryClient } from "@/lib/react-query-client";

type RegisterPayload = z.infer<typeof RegisterSchema>;

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email?: string;
    phone?: string;
    name: string;
  };
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await apiClient.post<AuthResponse>(
        "/auth/register",
        payload
      );
      return data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Register error:", error.response?.data?.message);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<AuthResponse>("/auth/logout");
      return data;
    },
    onSuccess: () => {
      // ✅ Important: clear user-related cache
      queryClient.clear();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Register error:", error.response?.data?.message);
    },
  });
};
