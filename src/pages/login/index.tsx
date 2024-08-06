import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/textInput';
import {
  Container,
  ErrorMessage,
  Divider,
  TextInputWrapper,
  SubmitBtnWrapper,
  CoverImage,
  ImgContainer,
} from './styles';
import { TitleStyle } from '../../components/title/styles';
import LineText from '../../components/lineText';
import { SubmitBtn } from '../../components/submitBtn';
import axios from 'axios';

// TODO: logo 설정
import cover from '../../assets/cover.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      alert('이미 로그인 되어있습니다');

      return;
    }

    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    setIsButtonActive(emailValid && passwordValid);
  }, [email, password]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
      emailRegex.test(email) && email.length > 0 && email.length <= 50;
    setEmailError(isValid ? '' : '이메일 형식이 올바르지 않습니다');
    return isValid;
  };

  const validatePassword = (password: string) => {
    let isValid = false;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length >= 8 && password.length <= 15) {
      if (passwordRegex.test(password)) {
        isValid = true;
        setPasswordError('');
      } else {
        setPasswordError('비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다');
      }
    } else {
      setPasswordError('비밀번호는 8자리 이상 15자리 이하입니다');
    }
    return isValid;
  };

  const handleEmailChange = ({ value }: { value: string }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ value }: { value: string }) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (isButtonActive) {
      try {
        const payload = {
          username: email,
          password: password,
        };

        axios.post(window.location.hostname + '/api/login', payload);
        navigate('/map');
      } catch (error) {
        console.error('로그인 오류', error);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef?: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (nextRef) {
        nextRef.current?.focus();
      } else if (isButtonActive) {
        handleLogin();
      }
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isButtonActive) {
      handleLogin();
    }
  };

  return (
    <>
      <ImgContainer>
        <CoverImage src={cover} />
      </ImgContainer>

      <Container onKeyDown={handleFormKeyDown}>
        <TitleStyle>로그인</TitleStyle>

        <TextInputWrapper>
          <TextInput
            ref={emailRef}
            placeholder="이메일 계정을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          />
          {email && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </TextInputWrapper>

        <TextInputWrapper>
          <TextInput
            ref={passwordRef}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          {password && passwordError && (
            <ErrorMessage>{passwordError}</ErrorMessage>
          )}
        </TextInputWrapper>

        <SubmitBtnWrapper>
          <SubmitBtn
            type="login"
            isActive={isButtonActive}
            onClick={handleLogin}
          />
        </SubmitBtnWrapper>

        <Divider />

        <LineText text={'아직 회원이 아니신가요?'} textLine={false} />
      </Container>
    </>
  );
};

export default LoginScreen;
