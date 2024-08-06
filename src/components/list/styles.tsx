import styled from 'styled-components';
import { ListItem as MuiListItem } from '@mui/material';

export const PostItem = styled(MuiListItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const PostTag = styled.div`
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 15px -5px;
  align-self: flex-start;
`;

export const PostSubtitle = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

export const PostInfo = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
`;
