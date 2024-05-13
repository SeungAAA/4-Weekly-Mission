import { MouseEventHandler, ReactNode } from "react";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type CardProps = {
  children: ReactNode;
  onMouseOver: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
};

export const Card = ({ children, onMouseOver, onMouseLeave, onMouseDown }: CardProps) => {
  return (
    <div
      className={cx("container")}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};
