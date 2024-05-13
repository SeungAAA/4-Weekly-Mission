import { axiosInstance } from "@/src/sharing/util";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback } from "react";

type Response = { isUsableEmail: boolean };

export const useCheckEmailDuplicate = (email: string) => {
  const checkEmailDuplicate = useCallback(
    () =>
      axiosInstance.post<Response>("/users/check-email", {
        email,
      }),
    [email]
  );
  const { data, error, isLoading, refetch } = useQuery<{ data: Response }, AxiosError>({
    queryKey: ["check-email"],
    queryFn: checkEmailDuplicate,
    enabled: false,
    retry: false,
    networkMode: "always",
  });

  return {
    refetch,
    isLoading,
    error,
    data,
  };
};
