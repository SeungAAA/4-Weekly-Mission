import { Folder, FolderRawData } from "@/src/folder/type";

export const mapFoldersData = (folders?: FolderRawData[]): Folder[] => {
  if (!folders) return [];

  return folders.map((folder) => {
    const { id, created_at, name, user_id, link_count } = folder;

    return {
      id,
      createdAt: created_at,
      name,
      userId: user_id,
      linkCount: link_count || 0,
    };
  });
};
