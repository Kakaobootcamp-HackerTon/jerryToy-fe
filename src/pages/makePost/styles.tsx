import { TextField } from '@mui/material';
import styled from 'styled-components';

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
