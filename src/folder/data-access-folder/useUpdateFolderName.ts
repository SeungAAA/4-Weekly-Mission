import { axiosInstance } from "@/src/sharing/util";
import { FolderRawData } from "../type";
import { useMutation } from "@tanstack/react-query";
import { useGetFolders } from ".";

type Params = { folderId: number; name: string };

export const useUpdateFolderName = () => {
  const { refetch } = useGetFolders();
  const updateFolderName = ({ folderId, name }: Params) =>
    axiosInstance.put<FolderRawData[]>(`/folders/${folderId}`, {
      name,
    });

  const { mutate } = useMutation({
    mutationKey: ["updateFolderName"],
    mutationFn: updateFolderName,
    onSuccess: () => refetch(),
    retry: false,
  });

  return { mutate };
};
