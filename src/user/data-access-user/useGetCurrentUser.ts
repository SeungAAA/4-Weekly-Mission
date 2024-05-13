import { axiosInstance, useEffectOnce } from "@/src/sharing/util";
import { UserRawData } from "../type";
import { useState } from "react";
import { DEFAULT_USER } from "./constant";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffectOnce(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  });

  const getCurrentUser = () => axiosInstance.get<UserRawData[]>("users");

  const { isLoading, error, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!accessToken,
  });

  const userDataResponse = data?.data?.[0];
  const userData = userDataResponse
    ? {
        id: userDataResponse.id,
        name: userDataResponse.name,
        email: userDataResponse.email,
        imageSource: userDataResponse.image_source,
      }
    : DEFAULT_USER;

  return { isLoading, error, data: userData };
};
