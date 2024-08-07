import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Tag } from '../../types';
import mockUpDestinations from '../../mockupData/destinations.json';
import { CustomTextField } from './styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const tags: Tag[] = [
  { tag: '숙박', name: '숙박' },
  { tag: '음식점', name: '음식점' },
  { tag: '테마여행', name: '테마여행' },
  { tag: '관광지', name: '관광지' },
  { tag: '축제/행사', name: '축제/행사' },
  { tag: '쇼핑', name: '쇼핑' },
];

const PostCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [destName, setDestName] = useState('');
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');
  const [locations, setLocations] = useState(mockUpDestinations);

  useEffect(() => {
    fetch('../../mockupData/destinations.json')
      .then((response) => response.json())
      .then((jsonData) => setLocations(jsonData));
  }, []);

  const handleSelectLocation = (place: any) => {
    setDestName(place.destName);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content,
        destName,
        tagList: [label],
      };

      localStorage.setItem('post', JSON.stringify(payload));
      console.log('게시글 작성 완료:', localStorage.getItem('post'));
    } catch (error) {
      console.error('게시글 작성 오류:', error);
    }
  };

  const handleLabelChange = (event: SelectChangeEvent<string>) => {
    setLabel(event.target.value);
    setDestName('');
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: '100px' }}>
      <ChevronLeftIcon
        style={{
          position: 'absolute',
          top: '20px',
          cursor: 'pointer',
        }}
        onClick={() => window.history.back()}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        게시글 작성
      </Typography>
      <CustomTextField
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>라벨</InputLabel>
        <Select value={label} onChange={handleLabelChange}>
          {tags.map((tag) => (
            <MenuItem key={tag.tag} value={tag.tag}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>장소 선택</InputLabel>
        <Select
          value={destName}
          onChange={(e) => {
            const selectedPlace = locations.find(
              (location) => location.dest_name === e.target.value
            );
            if (selectedPlace) {
              handleSelectLocation(selectedPlace);
            }
          }}
          disabled={!label}
        >
          {locations.map((location) => (
            <MenuItem key={location.dest_id} value={location.dest_name}>
              {location.dest_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomTextField
        label="글"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          style={{
            backgroundColor: 'var(--active-button-color)',
          }}
        >
          작성 완료
        </Button>
      </Box>
    </Container>
  );
};

export default PostCreatePage;
