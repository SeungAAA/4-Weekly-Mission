import { axiosInstance } from "@/src/sharing/util";
import { UserRawData } from "@/src/user/type";
import { DEFAULT_USER } from "./constant";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId?: number) => {
  const getUser = () => axiosInstance.get<UserRawData[]>(`/users/${userId}`);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: getUser,
    enabled: !!userId,
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
