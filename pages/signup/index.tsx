import classNames from 'classnames/bind';
import styles from './signin.module.scss';
import { useForm } from 'react-hook-form';
import { LOGO_IMAGE } from '@/src/sharing/ui-navigation-bar/constant';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/src/sharing/ui-input';
import { ChangeEvent } from 'react';

export const cx = classNames.bind(styles);

const SignUpPage = () => {
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
        <p>이미 회원이신가요?</p>
        <Link href='/signin'>로그인 하기</Link>
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
        <div className={cx('passwordcheckInput')}>
          <label htmlFor='password_check'>비밀번호 확인</label>
          <Input
            register={register('passwordcheck', {
              required: {
                value: true,
                message: '비밀번호를 입력해 주세요.',
              },
              validate: (value, formValues) => {
                return value === formValues.password || '비밀번호가 일치하지 않아요.';
              },
            })}
            type='passwordcheck'
            value={''}
            name={''}
            onChange={function (e: ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          ></Input>
        </div>
        <button type='submit' className={cx('submitbtn')}>
          회원가입
        </button>
      </form>
    </div>
  );
};
