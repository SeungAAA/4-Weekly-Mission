import { axiosInstance } from "@/src/sharing/util";
import { useMutation } from "@tanstack/react-query";
import { useGetLinks } from ".";
import { LinkRawData } from "../type";
import { SelectedFolderId } from "@/src/folder/type";
import { useGetFolders } from "@/src/folder/data-access-folder";

type Params = { url: string; folderId: number };

export const useAddLink = (folderId?: SelectedFolderId) => {
  const { refetch: getLinks } = useGetLinks(folderId);
  const { refetch: getFolders } = useGetFolders();
  const addLink = ({ url, folderId }: Params) =>
    axiosInstance.post<LinkRawData[]>("/links", {
      url,
      folderId,
    });

  const { mutate } = useMutation({
    mutationKey: ["addLink"],
    mutationFn: addLink,
    onSuccess: () => {
      getLinks();
      getFolders();
    },
    retry: false,
  });

  return { mutate };
};
