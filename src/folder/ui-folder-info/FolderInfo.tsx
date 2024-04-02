import styles from './FolderInfo.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cx = classNames.bind(styles);

type FolderInfoProps = {
  profileImage: string;
  ownerName: string;
  folderName: string;
};

export const FolderInfo = ({ profileImage, ownerName, folderName }: FolderInfoProps) => {
  return (
    <div className={cx('container')}>
      <Image className={cx('profile')} src={profileImage} alt='폴더 소유자 프로필 이미지' />
      <span className={cx('owner')}>{ownerName}</span>
      <h2 className={cx('folder')}>{folderName}</h2>
    </div>
  );
};
