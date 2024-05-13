import { axiosInstance } from "@/src/sharing/util";
import { FolderRawData } from "../type";
import { useMutation } from "@tanstack/react-query";
import { useGetFolders } from ".";

type Params = { name: string };

export const useAddFolder = () => {
  const { refetch } = useGetFolders();
  const addFolder = ({ name }: Params) =>
    axiosInstance.post<FolderRawData[]>("/folders", {
      name,
    });

  const { mutate } = useMutation({
    mutationKey: ["addFolder"],
    mutationFn: addFolder,
    onSuccess: () => refetch(),
    retry: false,
  });

  return { mutate };
};
