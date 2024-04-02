import { MouseEventHandler } from 'react';
import styles from './IconAndTextButton.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind(styles);

type IconAndTextButtonProps = {
  iconSource: string;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const IconAndTextButton = ({ iconSource, text, onClick }: IconAndTextButtonProps) => {
  return (
    <button className={cx('container')} onClick={onClick}>
      <Image className={cx('icon')} src={iconSource} alt={`${text} 아이콘`} />
      <span className={cx('text')}>{text}</span>
    </button>
  );
};
