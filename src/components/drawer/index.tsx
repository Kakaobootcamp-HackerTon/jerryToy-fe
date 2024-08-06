import React, { useState } from 'react';
import { Button, Divider, List as MuiList, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { Drawer, CategoryList, DrawerHeader, CategoryItem } from './styles';
import ListComponent from '../list';

const DrawerComponent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([
    '인기글',
    '맛집',
    '병원/약국',
    '생활/편의',
    '교육',
  ]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleRemoveCategory = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파를 막음
    setCategories(categories.filter((_, i) => i !== index));
  };

  const posts = [
    {
      tag: '교육',
      title: '영어회화 학원을 다니고 싶은데',
      subtitle: '기초부터 차근차근 잘 알려주는 학원 있을까요?',
      location: '망우제3동',
      time: '7분 전',
    },
    {
      tag: '일반',
      title: '동네에 친구가 없으니 너무 심심해요ㅠㅠ',
      subtitle: '동네친구 하실분 있나요? 까페가서 수다떨거...',
      location: '망우본동',
      time: '6시간 전',
      views: 122,
    },
    {
      tag: '이벤트',
      title: '찾아라! 투명한 페트병',
      subtitle: '코카-콜라와 당근에서 준비한 선물을 드려요!',
      location: '망우제3동',
    },
    {
      tag: '자기계발',
      title: '온라인셀러들의 친목방',
      subtitle: '현재 온라인 판매하면서 혼자 헤쳐나가기가 ...',
      location: '갈매동',
      time: '6시간 전',
      members: 6,
    },
  ];

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <DrawerHeader>망우제3동</DrawerHeader>
      <CategoryList>
        {categories.map((text, index) => (
          <CategoryItem key={index}>
            <span>{text}</span>
            <IconButton
              size="small"
              edge="end"
              aria-label="delete"
              onClick={(event) => handleRemoveCategory(index, event)}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </CategoryItem>
        ))}
      </CategoryList>
      <Divider />
      <ListComponent posts={posts} />
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.08)', // 배경 오버레이 색상을 더 밝게 설정
          },
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
