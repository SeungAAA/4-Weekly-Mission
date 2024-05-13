import { axiosInstance } from "@/src/sharing/util";
import { FolderRawData } from "../type";
import { DEFAULT_FOLDER } from "./constant";
import { useQuery } from "@tanstack/react-query";

export const useGetFolder = (folderId: string) => {
  const getFolder = () => axiosInstance.get<FolderRawData[]>(`/folders/${folderId}`);

  const { data, error, isLoading } = useQuery({
    queryKey: ["folders", folderId],
    queryFn: getFolder,
    enabled: !!folderId,
  });

  const folderDataResponse = data?.data?.[0];

  const folderData = folderDataResponse
    ? {
        id: folderDataResponse.id,
        name: folderDataResponse.name,
        userId: folderDataResponse.user_id,
        createdAt: folderDataResponse.created_at,
      }
    : DEFAULT_FOLDER;

  return { isLoading, error, data: folderData };
};
