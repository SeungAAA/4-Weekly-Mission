import { axiosInstance } from "@/src/sharing/util";
import { useCallback, useEffect } from "react";
import { Token } from "../type";
import { useMutation } from "@tanstack/react-query";

type UseSignInParams = { email: string; password: string };

export const useSignIn = ({ email, password }: UseSignInParams) => {
  const signIn = useCallback(
    () =>
      axiosInstance.post<Token>("/auth/sign-in", {
        email,
        password,
      }),
    [email, password]
  );
  const { mutate, data, error } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signIn,
    retry: false,
  });

  const accessToken = data?.data.accessToken;

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  return {
    mutate,
    error,
    data,
  };
};
