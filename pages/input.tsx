import styles from 'components/SignInput/SignInpupt.module.css';
import { useEffect, useRef, useState } from 'react';
import { ICreateUser } from '/types';

const userSchema = {
  id: {
    validate: (id: string) => {
      // ~~~
      return true | fasle; // '아이디는 영문으로만 하세요.'
    },
  },
};

const SignForm = () => {
  const [userFormData, setUserFormData] = useState<ICreateUser>({
    id,
    value,
    pw,
  });
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [isIdError, setIsIdError] = useState('');
  const [isPwError, setIsPwError] = useState('');
  const PasswordInputRef = useRef(null);
  const IdInputRef = useRef(null);

  const handleIdInputFocused = () => {
    setIdInputFocused(true);
  };

  const handlePwInputFocused = () => {
    setPwInputFocused(true);
  };

  const handleEyeButtonClicked = (e) => {
    e.preventDefault();
    if (isPasswordOpened) {
      PasswordInputRef.current.type = 'text';
      return setIsPasswordOpened(false);
    }
    PasswordInputRef.current.type = 'password';
    return setIsPasswordOpened(true);
  };

  const handleIdInputChange = (e) => {
    setIdValue(e.target.value);
    setUserFormData((prev) => ({
      ...prev,
      id: e.target.value,
    }));
  };

  const handlePwInputChange = (e) => {
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
