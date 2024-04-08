import classNames from 'classnames/bind';
import styles from './signin.module.scss';
import { useForm } from 'react-hook-form';
import { LOGO_IMAGE } from '@/src/sharing/ui-navigation-bar/constant';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/src/sharing/ui-input';
import { ChangeEvent } from 'react';

export const cx = classNames.bind(styles);

const signin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <Link href='/'>
        <Image
          src={LOGO_IMAGE}
          alt='logo'
          id='logo'
          className={cx('logo')}
          width={210}
          height={38}
        />
      </Link>
      <div className={cx('description')}>
        <p>회원이 아니신가요?</p>
        <Link href='/signup'>회원 가입하기</Link>
      </div>

      <form className={cx('form')} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={cx('idBox')}>
          <label htmlFor='email'>이메일</label>
          <Input
            register={register('email', {
              required: {
                value: true,
                message: '이메일을 입력해 주세요.',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 주소가 아닙니다.',
              },
            })}
            type='email'
            value={''}
            onChange={function (event: ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
            name={''}
          ></Input>
        </div>
        <div className={cx('passwordInput')}>
          <label htmlFor='password'>비밀번호</label>
          <Input
            register={register('password', {
              required: {
                value: true,
                message: '비밀번호를 입력해 주세요.',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
              },
            })}
            type='password'
            value={''}
            name={''}
            onChange={function (e: ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          ></Input>
        </div>
        <button type='submit' className={cx('loginBtn')}>
          로그인
        </button>
      </form>
    </div>
  );
};
