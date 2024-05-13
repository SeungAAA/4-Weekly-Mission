import { FolderRawData } from "@/src/folder/type";
import { mapFoldersData } from "@/src/folder/util-map";
import { axiosInstance } from "@/src/sharing/util";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = () => {
  const getFolders = () => axiosInstance.get<FolderRawData[]>("/folders");
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const folders = mapFoldersData(data?.data ?? []);
  const sortedFolders = folders.sort((a, b) => a?.id - b?.id);

  return { isLoading, error, data: sortedFolders, refetch };
};
