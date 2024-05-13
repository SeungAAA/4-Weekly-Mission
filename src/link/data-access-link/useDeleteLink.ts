import { axiosInstance, queryClient } from "@/src/sharing/util";
import { useMutation } from "@tanstack/react-query";
import { useGetLinks } from ".";
import { LinkRawData } from "../type";
import { SelectedFolderId } from "@/src/folder/type";
import { useGetFolders } from "@/src/folder/data-access-folder";

type Params = { linkId: number };

export const useDeleteLink = (folderId?: SelectedFolderId) => {
  const { refetch: getLinks } = useGetLinks(folderId);
  const { refetch: getFolders } = useGetFolders();
  const deleteLink = ({ linkId }: Params) =>
    axiosInstance.delete<LinkRawData[]>(`/links/${linkId}`);

  const { mutate } = useMutation({
    mutationKey: ["deleteLink"],
    mutationFn: deleteLink,
    onSuccess: () => {
      getLinks();
      getFolders();
      queryClient.invalidateQueries({ queryKey: ["getLinks", folderId] });
    },
    retry: false,
  });

  return { mutate };
};
