import styled from 'styled-components';
import { Drawer as MuiDrawer } from '@mui/material';

export const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    width: 240px;
  }
`;

export const DrawerHeader = styled.div`
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  border-radius: 16px;
  padding: 5px 10px;
  margin: 5px;
  white-space: nowrap;

  span {
    margin-right: 8px;
  }

  button {
    padding: 0;
  }
`;
