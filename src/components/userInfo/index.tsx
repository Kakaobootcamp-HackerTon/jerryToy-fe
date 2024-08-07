import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Slider,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Male as MaleIcon,
  Female as FemaleIcon,
  CalendarToday as CalendarIcon,
  WbSunny as TemperatureIcon,
  TravelExplore as TravelIcon,
  AccessTime as RecentIcon,
  InsertEmoticon as EmoticonIcon,
  Face as FaceIcon,
} from '@mui/icons-material';
import { UserInfoContainer, BackgroundImage, CardContainer } from './styles';
import cover from '../../assets/background.jpg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface UserInfoType {
  userId: number;
  nickname: string;
  age: number;
  mbti: string;
  gender: string;
  regDate: string;
  recent_match: string;
  count: number;
  degree: number;
}

const UserInfoExample = {
  userId: 1,
  nickname: 'Tony',
  age: 25,
  mbti: 'INTJ',
  gender: 'M',
  regDate: '2022-01-01',
  recent_match: '2023-01-01',
  count: 10,
  degree: 36.5,
};

const UserInfo: React.FC<{ userId: number }> = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(UserInfoExample);

  if (!userInfo) {
    return (
      <UserInfoContainer>
        <CircularProgress />
      </UserInfoContainer>
    );
  }

  return (
    <UserInfoContainer>
      <ChevronLeftIcon
        style={{
          position: 'absolute',
          top: '20px',
          cursor: 'pointer',
        }}
        onClick={() => window.history.back()}
      />
      <CardContainer>
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={`https://via.placeholder.com/150?text=${userInfo.nickname}`}
                sx={{ width: 56, height: 56 }}
              />
            }
            title={
              <Typography variant="h5" component="div">
                {userInfo.nickname}
              </Typography>
            }
            subheader={
              <Box display="flex" alignItems="center">
                <CalendarIcon fontSize="small" />
                <Typography variant="body2" ml={0.5}>
                  가입일:{' '}
                  {new Date(userInfo.regDate).toLocaleDateString('ko-KR')}
                </Typography>
              </Box>
            }
            action={
              <Tooltip title="사용자 정보">
                <IconButton>
                  <FaceIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>
                사용자 정보
              </Typography>
              <Divider />
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    {userInfo.gender === '남성' ? <MaleIcon /> : <FemaleIcon />}
                    <Typography variant="body1" ml={0.5}>
                      성별: {userInfo.gender}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <FaceIcon />
                    <Typography variant="body1" ml={0.5}>
                      나이: {userInfo.age}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <EmoticonIcon />
                    <Typography variant="body1" ml={0.5}>
                      MBTI: {userInfo.mbti}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <TravelIcon />
                    <Typography variant="body1" ml={0.5}>
                      동행 횟수: {userInfo.count}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <RecentIcon />
                    <Typography variant="body1" ml={0.5}>
                      최근 동행:
                    </Typography>
                  </Box>
                  <Typography variant="body1" ml={4}>
                    {new Date(userInfo.recent_match).toLocaleDateString(
                      'ko-KR'
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={3}>
              <Box display="flex" alignItems="center" mb={1}>
                <TemperatureIcon />
                <Typography variant="body1" ml={0.5}>
                  온도
                </Typography>
              </Box>
              <Slider
                value={userInfo.degree}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                aria-labelledby="temperature-slider"
                sx={{ color: 'var(--active-button-color' }}
              />
            </Box>
          </CardContent>
        </Card>
      </CardContainer>
    </UserInfoContainer>
  );
};

export default UserInfo;
