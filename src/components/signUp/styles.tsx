import styled from 'styled-components';
import { Button, Box, TextField } from '@mui/material';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const CustomTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--active-button-color)',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'var(--active-button-color)',
    },
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: 'var(--active-button-color)',
  },
});

export const SelectionButton = styled(Button)`
  width: 160px;
  margin: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const StepperContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
