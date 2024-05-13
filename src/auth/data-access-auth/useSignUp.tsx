import { axiosInstance } from "@/src/sharing/util";
import { useCallback, useEffect } from "react";
import { Token } from "../type";
import { useMutation } from "@tanstack/react-query";

type UseSignUpParams = { email: string; password: string };

export const useSignUp = ({ email, password }: UseSignUpParams) => {
  const signUp = useCallback(
    () =>
      axiosInstance.post<Token>("/auth/sign-up", {
        email,
        password,
      }),
    [email, password]
  );
  const { mutate, data } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUp,
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
    data,
  };
};
