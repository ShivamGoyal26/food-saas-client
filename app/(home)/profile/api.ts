import apiClient from "@/lib/api-client";

type updateProfileProps = {
  name: string;
};

export const updateProfile = ({ name }: updateProfileProps) =>
  apiClient.put<any>("/users/me", { name }).then((res) => res.data);

export const getProfile = () =>
  apiClient.get<any>("/users/me").then((res) => res.data);
