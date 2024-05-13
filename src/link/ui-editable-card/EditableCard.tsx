import styles from "./EditableCard.module.scss";
import classNames from "classnames/bind";
import { CSSProperties, MouseEventHandler, useCallback, useRef, useState } from "react";
import { Card } from "@/src/sharing/ui-card";
import { CardContent } from "@/src/sharing/ui-card-content";
import { CardImage } from "@/src/sharing/ui-card-image";
import { Popover } from "@/src/sharing/ui-popover";
import Star from "./star.svg";

const cx = classNames.bind(styles);

type EditableCardProps = {
  url: string;
  imageSource: string;
  alt: string;
  elapsedTime: string;
  description: string;
  createdAt: string;
  isFavorite: boolean;
  popoverPosition: {
    top?: CSSProperties["top"];
    right?: CSSProperties["right"];
    bottom?: CSSProperties["bottom"];
    left?: CSSProperties["left"];
  };
  onStarClick: () => void;
  onDeleteClick: () => void;
  onAddToFolderClick: () => void;
};

export const EditableCard = ({
  url,
  imageSource,
  alt,
  elapsedTime,
  description,
  createdAt,
  isFavorite,
  popoverPosition,
  onStarClick,
  onDeleteClick,
  onAddToFolderClick,
}: EditableCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const kebabButtonRef = useRef(null);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };
  const handleMouseDown = () => setIsActive(true);
  const handleStarClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onStarClick();
  };
  const handleKebabClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setIsPopoverOpen(true);
  };
  const handleBackgroundClick = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);
  const handleDeleteClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    onDeleteClick();
    setIsPopoverOpen(false);
  };
  const handleAddToFolderClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    onAddToFolderClick();
    setIsPopoverOpen(false);
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Card
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
      >
        <CardImage imageSource={imageSource} alt={alt} isZoomedIn={isHovered} isActive={isActive} />
        <CardContent
          elapsedTime={elapsedTime}
          description={description}
          createdAt={createdAt}
          isHovered={isHovered}
        />
        <button className={cx("star")} onClick={handleStarClick}>
          <Star className={cx("star-icon", { favorite: isFavorite })} />
        </button>
        <button ref={kebabButtonRef} className={cx("kebab")} onClick={handleKebabClick}>
          <img src="/images/kebab.svg" alt="더보기를 나타내는 점 3개" />
        </button>
        <Popover
          isOpen={isPopoverOpen}
          anchorRef={kebabButtonRef}
          anchorPosition={popoverPosition}
          onBackgroundClick={handleBackgroundClick}
        >
          <ul className={cx("popover-list")}>
            <li onClick={handleDeleteClick}>삭제하기</li>
            <li onClick={handleAddToFolderClick}>폴더에 추가</li>
          </ul>
        </Popover>
      </Card>
    </a>
  );
};
