import { useCallback, useEffect } from "react";
import { axiosInstance } from "@/src/sharing/util";
import { mapLinksData } from "@/src/link/util-map/mapLinksData";
import { ALL_LINKS_ID } from "./constant";
import { SelectedFolderId } from "@/src/folder/type";
import { LinkRawData } from "@/src/link/type";
import { formatLinkRawData } from "../util-map";
import { useQuery } from "@tanstack/react-query";

export const useGetLinks = (folderId?: SelectedFolderId) => {
  const path = folderId === ALL_LINKS_ID ? "/links" : `/folders/${folderId}/links`;
  const getLinks = useCallback(() => axiosInstance.get<LinkRawData[]>(path), [path]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getLinks", folderId],
    queryFn: getLinks,
    enabled: !!folderId,
  });

  const linksData = data?.data?.map(formatLinkRawData).map(mapLinksData) ?? [];

  return { isLoading, error, data: linksData, refetch };
};
