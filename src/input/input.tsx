import styles from 'inpupt.module.scss';
import { useEffect, useRef, useState } from 'react';

const SignInput = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [idInputFocused, setIdInputFocused] = useState<boolean>(false);
  const [pwInputFocused, setPwInputFocused] = useState<boolean>(false);
  const [isPasswordOpened, setIsPasswordOpened] = useState<boolean>(false);
  const [isIdError, setIsIdError] = useState<string>('');
  const [isPwError, setIsPwError] = useState<string>('');
  const PasswordInputRef = useRef<HTMLInputElement>(null);
  const IdInputRef = useRef<HTMLInputElement>(null);

  const handleIdInputFocused = () => {
    setIdInputFocused(true);
  };

  const handlePwInputFocused = () => {
    setPwInputFocused(true);
  };

  const handleEyeButtonClicked = () => {
    const passwordInput = PasswordInputRef.current;
    if (passwordInput) {
      if (isPasswordOpened) {
        passwordInput.type = 'text';
        setIsPasswordOpened(false);
      } else {
        passwordInput.type = 'password';
        setIsPasswordOpened(true);
      }
    }
  };

  const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  const handlePwInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  useEffect(() => {
    if (IdInputRef.current) {
      IdInputRef.current.addEventListener('focusout', () => {
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]+$/;
        if (!idValue.trim()) {
          return setIsPwError('이메일을 입력해 주세요.');
        }
        if (!emailRegExp.test(idValue.trim())) {
          return setIsPwError('올바른 이메일 주소가 아닙니다.');
        }
        return setIsIdError('');
      });
    }
  }, [idValue]);

  useEffect(() => {
    if (PasswordInputRef.current) {
      PasswordInputRef.current.addEventListener('focusout', () => {
        if (!pwValue.trim()) {
          return setIsPwError('비밀번호를 입력해 주세요.');
        }
        return setIsPwError('');
      });
    }
  }, [pwValue]);

  return (
    <form>
      <input
        className={`${styles.IdInput} ${idInputFocused ? styles.Focused : ''} ${
          isIdError ? styles.Error : ''
        }`}
        placeholder='내용 입력'
        onFocus={handleIdInputFocused}
        onChange={handleIdInputChange}
        value={idValue}
        ref={IdInputRef}
      />
      <div>{isIdError}</div>
      <input
        className={`${styles.PwInput} ${pwInputFocused ? styles.Focused : ''} ${
          isPwError ? styles.Error : ''
        }`}
        ref={PasswordInputRef}
        placeholder='내용 입력'
        type='password'
        onFocus={handlePwInputFocused}
        onChange={handlePwInputChange}
        value={pwValue}
      />
      <div>{isPwError}</div>
      <button onClick={handleEyeButtonClicked}>눈모양 버튼입니다</button>
    </form>
  );
};

export default SignInput;
