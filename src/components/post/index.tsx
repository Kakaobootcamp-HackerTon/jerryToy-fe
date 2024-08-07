import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Paper,
} from '@mui/material';
import {
  Favorite,
  LocationOn,
  CalendarToday,
  Visibility,
  Person,
  Cake,
  EmojiPeople,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  PostContainer,
  UserInfo,
  DestInfo,
  ActionsContainer,
  FavoriteIcon,
  ContentContainer,
  MetaData,
  MetaItem,
  TransferListContainer,
} from './styles';
import TransferList from './transferList';
import { Post } from './types';

// Mock data
const mockPost: Post = {
  postId: 1,
  user: {
    userId: 1,
    nickname: 'Tony',
    age: 25,
    mbti: 'INTJ',
    gender: 'M',
    regDate: '2022-01-01',
    recent_match: '2023-01-01',
    count: 10,
    degree: 0.0,
  },
  dest: {
    destId: 583,
    destName: '디어펫',
    label: '관광지',
    address: '제주특별자치도 제주시',
    roadaddress: '제주특별자치도 제주시 연동 1531-7',
    latitude: 33.3617,
    longitude: 126.5292,
    tagList: ['애완동물'],
  },
  title: '디어펫 가실 분 구합니다',
  content: '디어펫이라고 들어보셨나요?',
  postDate: '2022-01-01',
  tag: '강아지놀이터',
  likes: 4,
  views: 10,
  people: 5,
};

const mockLikedUsers = [
  { userId: 1, nickname: '릴리', mbti: 'INTJ', age: 24 },
  { userId: 2, nickname: '데릭', mbti: 'ESFP', age: 28 },
  { userId: 3, nickname: '제이미', mbti: 'ESFP', age: 25 },
  { userId: 4, nickname: '제이드', mbti: 'INTJ', age: 26 },
];

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState<any[]>(mockLikedUsers);
  const [checked, setChecked] = useState<string[]>([]);
  const [showTransferList, setShowTransferList] = useState(false);

  useEffect(() => {
    // API call replaced with mock data
    const fetchPost = async () => {
      setPost(mockPost);
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    setLiked(!liked);
    if (!liked) {
      try {
        // const response = await axios.get(`/api/like/${postId}`);
        // setLikeList(response.data);
        setLikeList(mockLikedUsers); // Mock data
        setShowTransferList(true);
      } catch (error) {
        console.error('Failed to load like list:', error);
      }
    } else {
      setShowTransferList(false);
    }
  };

  const handleChat = () => {
    // Navigate to chat screen
    navigate('/chat');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">로딩 중...</Typography>
      </Box>
    );
  }

  if (!post) {
    return <Typography variant="h6">게시글을 찾을 수 없습니다.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: '30px' }}>
      <ChevronLeftIcon
        style={{
          position: 'absolute',
          top: '20px',
          cursor: 'pointer',
        }}
        onClick={() => window.history.back()}
      />
      <PostContainer>
        <Typography variant="h4" component="div" gutterBottom>
          {post.title}
        </Typography>

        <UserInfo>
          <Box
            display="flex"
            alignItems="center"
            sx={{ gap: 2 }}
            onClick={() => navigate('/userInfo')}
            style={{ cursor: 'pointer' }}
          >
            <Person sx={{ color: 'orange' }} />
            <Typography variant="subtitle1" component="div">
              {post.user.nickname}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            <Cake sx={{ color: 'pink' }} />
            <Typography variant="body2" component="div">
              {post.user.age}세
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            <EmojiPeople sx={{ color: 'orange' }} />
            <Typography variant="body2" component="div">
              {post.user.mbti}
            </Typography>
          </Box>
        </UserInfo>

        <Paper elevation={3} sx={{ padding: 1, marginBottom: 2 }}>
          <ContentContainer>
            <Typography variant="body1" gutterBottom>
              {post.content}
            </Typography>
          </ContentContainer>
        </Paper>
        <DestInfo>
          <LocationOn sx={{ color: 'green' }} />
          <Typography variant="body2">{post.dest.destName}</Typography>
        </DestInfo>
        <MetaData>
          <MetaItem>
            <CalendarToday sx={{ color: 'blue' }} />
            {post.postDate}
          </MetaItem>
          <MetaItem>
            <Visibility sx={{ color: 'blue' }} />
            {post.views} 조회수
          </MetaItem>
        </MetaData>
        <ActionsContainer>
          <IconButton onClick={handleLike}>
            <FavoriteIcon
              liked={liked}
              sx={{ color: liked ? 'red' : 'gray' }}
            />
          </IconButton>
          <Typography variant="body2">{post.likes}</Typography>
        </ActionsContainer>
        {showTransferList && (
          <>
            <TransferListContainer>
              <TransferList
                items={likeList}
                checked={checked}
                setChecked={setChecked}
              />
            </TransferListContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChat}
              disabled={checked.length !== 1}
            >
              채팅하기
            </Button>
          </>
        )}
      </PostContainer>
    </Container>
  );
};

export default PostDetail;
