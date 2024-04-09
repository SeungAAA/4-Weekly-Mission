import { ChangeEvent, FocusEventHandler, HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';

const cx = classNames.bind(styles);

export type InputProps = {
  value: string | number;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | 'password' | 'email';
  hasError?: boolean;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  register: UseFormRegisterReturn<'email' | 'password' | 'passwordcheck'>;
};

export const Input = ({
  value,
  placeholder,
  type = 'text',
  hasError = false,
  helperText,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <div className={cx('container')}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cx('input', { error: hasError })}
      />
      {helperText && <p className={cx('helper-text', { error: hasError })}>{helperText}</p>}
    </div>
  );
};
