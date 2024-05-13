import classNames from "classnames/bind";
import styles from "./Draggable.module.scss";
import { ReactElement, memo, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const cx = classNames.bind(styles);

type DraggableProps = {
  children: ReactElement;
  id: number;
  index: number;
  someDragging: boolean;
  setSomeDragging: (someDragging: boolean) => void;
  move: (cardId: number, toIndex: number) => void;
};

export const Draggable = ({
  children,
  id,
  index,
  someDragging,
  setSomeDragging,
  move,
}: DraggableProps) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: "editableCard",
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: originId, index: originIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          move(originId, originIndex);
        }
      },
    }),
    [id, index, move]
  );

  const [, dropLeft] = useDrop(
    () => ({
      accept: "editableCard",
      hover(item: { id: number; index: number }) {
        const { id: draggedId } = item;
        if (draggedId !== id) {
          move(draggedId, index);
        }
      },
    }),
    [move]
  );

  const [, dropRight] = useDrop(
    () => ({
      accept: "editableCard",
      hover: (item: { id: number; index: number }) => {
        const { id: draggedId, index: orgIndex } = item;
        if (draggedId !== id) {
          if (orgIndex !== index + 1) {
            move(draggedId, index + 1);
          }
        }
      },
    }),
    [move]
  );

  useEffect(() => {
    isDragging ? setSomeDragging(true) : setSomeDragging(false);
  }, [isDragging, setSomeDragging]);

  return (
    <div className={cx("container")} ref={previewRef}>
      <div ref={dragRef}>
        {children}
        <div className={cx("drop", { dragging: someDragging })}>
          <div className={cx("left")} ref={dropLeft} />
          <div className={cx("right")} ref={dropRight} />
        </div>
      </div>
    </div>
  );
};
