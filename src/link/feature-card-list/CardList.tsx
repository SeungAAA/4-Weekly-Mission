import { useGetFolders } from "@/src/folder/data-access-folder";
import { AddLinkModal } from "@/src/link/ui-add-link-modal";
import { EditableCard } from "@/src/link/ui-editable-card";
import { NoLink } from "@/src/link/ui-no-link";
import { KeyboardEventHandler, useCallback, useMemo, useRef, useState } from "react";
import { CardList as UiCardList } from "@/src/link/ui-card-list";
import { AlertModal } from "@/src/sharing/ui-alert-modal";
import { DEFAULT_LINK, MODALS_ID } from "./constant";
import { Link } from "@/src/link/type";
import { SelectedFolderId } from "@/src/folder/type";
import {
  UpdateFavoriteLinkParams,
  useAddLink,
  useDeleteLink,
  useUpdateFavoriteLink,
} from "../data-access-link";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Draggable } from "@/src/sharing/ui-draggable";

type CardListProps = {
  links: Link[];
  currentFolderId?: SelectedFolderId;
};

export const CardList = ({ links, currentFolderId }: CardListProps) => {
  const { data: folders } = useGetFolders();
  const cardListRef = useRef(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<{ linkId: number; url: string }>(DEFAULT_LINK);
  const { mutate: addLink } = useAddLink(currentFolderId);
  const { mutate: updateFavoriteLink } = useUpdateFavoriteLink(currentFolderId);
  const { mutate: deleteLink } = useDeleteLink(currentFolderId);
  const getPopoverPosition = useCallback(
    (cardIndex: number) => {
      const count =
        cardListRef?.current !== null
          ? window
              .getComputedStyle(cardListRef?.current)
              .getPropertyValue("grid-template-columns")
              .split(" ").length
          : 1;
      if ((cardIndex + 1) % count === 0) {
        return { right: 0 };
      }
      return { left: 0 };
    },
    [cardListRef]
  );

  const closeModal = () => setCurrentModal(null);
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  const handleStarClick = ({ linkId, favorite }: UpdateFavoriteLinkParams) => {
    updateFavoriteLink({ linkId, favorite });
  };
  const handleDeleteClick = () => {
    deleteLink(
      { linkId: selectedLink.linkId },
      {
        onSuccess: () => {
          closeModal();
          setSelectedLink(DEFAULT_LINK);
        },
      }
    );
  };
  const handleAddClick = () => {
    if (typeof selectedFolderId === "number") {
      addLink(
        { url: selectedLink.url, folderId: selectedFolderId },
        {
          onSuccess: () => {
            closeModal();
            setSelectedLink(DEFAULT_LINK);
          },
        }
      );
    }
  };

  /**
   * Drag and Drop 관련 코드
   */
  const linkIds = links.map((link) => link.id);
  const [order, setOrder] = useState(linkIds);
  const move = (itemId: number, toIndex: number) => {
    const index = order.indexOf(itemId);
    let newOrder = [...order];
    newOrder.splice(index, 1);
    newOrder.splice(toIndex, 0, itemId);
    setOrder(newOrder);
  };
  const [someDragging, setSomeDragging] = useState(false);
  const cards = useMemo(() => {
    return links.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [links, order]);

  if (links.length === 0) {
    return <NoLink />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <UiCardList ref={cardListRef}>
        {cards.map((link, index) => (
          <Draggable
            key={link?.id}
            id={link?.id}
            move={move}
            someDragging={someDragging}
            setSomeDragging={setSomeDragging}
            index={index}
          >
            <EditableCard
              key={link?.id}
              {...link}
              popoverPosition={getPopoverPosition(index)}
              isFavorite={link?.favorite}
              onStarClick={() => handleStarClick({ linkId: link?.id, favorite: !link?.favorite })}
              onDeleteClick={() => {
                setSelectedLink({ url: link?.url ?? "", linkId: link?.id ?? 0 });
                setCurrentModal(MODALS_ID.deleteLink);
              }}
              onAddToFolderClick={() => {
                setSelectedLink({ url: link?.url ?? "", linkId: link?.id ?? 0 });
                setCurrentModal(MODALS_ID.addToFolder);
              }}
            />
          </Draggable>
        ))}
        <AlertModal
          isOpen={currentModal === MODALS_ID.deleteLink}
          title="링크 삭제"
          description={selectedLink.url}
          buttonText="삭제하기"
          onClick={handleDeleteClick}
          onCloseClick={closeModal}
          onKeyDown={handleKeyDown}
        />
        <AddLinkModal
          isOpen={currentModal === MODALS_ID.addToFolder}
          folders={folders}
          description={selectedLink.url}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          onAddClick={handleAddClick}
          onCloseClick={() => {
            setSelectedFolderId(null);
            closeModal();
          }}
          onKeyDown={handleKeyDown}
        />
      </UiCardList>
    </DndProvider>
  );
};
