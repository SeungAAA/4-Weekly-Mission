import { axiosInstance, queryClient } from "@/src/sharing/util";
import { useMutation } from "@tanstack/react-query";
import { useGetLinks } from ".";
import { LinkRawData } from "../type";
import { SelectedFolderId } from "@/src/folder/type";

export type UpdateFavoriteLinkParams = { linkId: number, favorite: boolean };

export const useUpdateFavoriteLink = (folderId?: SelectedFolderId) => {
  const { refetch: getLinks } = useGetLinks(folderId);
  const updateFavoriteLink = ({ linkId, favorite }: UpdateFavoriteLinkParams) =>
    axiosInstance.put<LinkRawData[]>(`/links/${linkId}`, { favorite });

  const { mutate } = useMutation({
    mutationKey: ["updateFavoriteLink"],
    mutationFn: updateFavoriteLink,
    onSuccess: () => {
      getLinks();
      queryClient.invalidateQueries({ queryKey: ["getLinks", folderId] });
    },
    retry: false,
  });

  return { mutate };
};
