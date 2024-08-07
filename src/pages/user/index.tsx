import React from 'react';
import UserInfo from '../../components/userInfo';
import { UserPageContainer } from './styles';

const UserPage: React.FC = () => {
  const userId = 1; // 실제 사용자 ID로 교체해야 함

  return (
    <UserPageContainer>
      <UserInfo userId={userId} />
    </UserPageContainer>
  );
};

export default UserPage;
