import styles from "./CardImage.module.scss";
import classNames from "classnames/bind";
import { DEFAULT_IMAGE } from "./constant";

const cx = classNames.bind(styles);

type CardImageProps = {
  imageSource: string;
  isZoomedIn: boolean;
  alt: string;
  isActive?: boolean;
};

export const CardImage = ({ imageSource, isZoomedIn, alt, isActive }: CardImageProps) => {
  return (
    <div className={cx("container", { active: isActive })}>
      <img
        src={imageSource ?? DEFAULT_IMAGE}
        className={cx("image", { zoomin: isZoomedIn, active: isActive })}
        alt={alt}
      />
    </div>
  );
};
