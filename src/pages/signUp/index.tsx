import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountSetup from '../../components/signUp/accountSetup';
import NicknameSetting from '../../components/signUp/nicknameSetting';
import GenderSelection from '../../components/signUp/genderSelection';
import AgeSelection from '../../components/signUp/ageSelection';
import MBTISelection from '../../components/signUp/mbtiSelection';
import {
  Container,
  NextButton,
  PrevButton,
  ButtonContainer,
  StepperContainer,
} from './styles';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  '아이디와 비밀번호',
  '닉네임 설정',
  '성별 선택',
  '나이 입력',
  'MBTI 선택',
];

const SignUp: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    gender: '',
    age: 0,
    mbti: {} as { [key: string]: string },
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSelect = (data: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <AccountSetup
            onSelect={handleSelect}
            selectedUsername={formData.username}
            selectedPassword={formData.password}
            selectedConfirmPassword={formData.confirmPassword}
          />
        );
      case 1:
        return (
          <NicknameSetting
            onSelect={handleSelect}
            selectedNickname={formData.nickname}
          />
        );
      case 2:
        return (
          <GenderSelection
            onSelect={handleSelect}
            selectedGender={formData.gender}
          />
        );
      case 3:
        return (
          <AgeSelection onSelect={handleSelect} selectedAge={formData.age} />
        );
      case 4:
        return (
          <MBTISelection onSelect={handleSelect} selectedMBTI={formData.mbti} />
        );
      default:
        return <div>완료</div>;
    }
  };

  const isNextButtonDisabled = () => {
    if (step === 0) {
      return (
        formData.username === '' ||
        formData.password === '' ||
        formData.password !== formData.confirmPassword
      );
    } else if (step === 1) {
      return formData.nickname === '';
    } else if (step === 2) {
      return formData.gender === '';
    } else if (step === 3) {
      return formData.age <= 0 || formData.age > 100;
    } else if (step === 4) {
      return (
        !formData.mbti['e'] ||
        !formData.mbti['s'] ||
        !formData.mbti['t'] ||
        !formData.mbti['j']
      );
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname,
        age: formData.age,
        gender: formData.gender,
        mbti: Object.values(formData.mbti).join(''),
      };
      console.log('Sending payload:', payload); // Debugging line

      await axios.post(
        window.location.hostname + '/api/users/register',
        payload,
        {
          headers: {
            Credentials: 'include',
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/signUpDone');
    } catch (error) {
      console.error('회원가입 오류:', error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <Container>
      <StepperContainer>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
      {renderStep()}
      <ButtonContainer>
        <PrevButton
          variant="outlined"
          onClick={handleBack}
          disabled={step === 0}
        >
          이전
        </PrevButton>
        <NextButton
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isNextButtonDisabled()}
        >
          {step === steps.length - 1 ? '완료' : '다음'}
        </NextButton>
      </ButtonContainer>
    </Container>
  );
};

export default SignUp;
