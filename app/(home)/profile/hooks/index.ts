import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await apiClient.get("/users/me");
      return data;
    },
    retry: false,
  });
};
