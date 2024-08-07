import React, { useEffect, useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, CategoryList, DrawerHeader, CategoryItem } from './styles';
import ListComponent from '../list';
import { Tag } from '../../types';
import { ButtonTagStyle } from '../floatTags/styles';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import mockUpPosts from '../../mockupData/posts.json';
import { Post } from '../post/types';

interface DrawerComponentProps {
  tagList: Tag[];
  selectedTags?: Tag[];
  data: any;
  isClicked?: boolean;
  destId?: number;
  onClose?: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  tagList,
  selectedTags,
  data,
  isClicked,
  destId,
  onClose,
}) => {
  const [posts, setPosts] = useState<Post[]>(mockUpPosts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tags, setTags] = useState(tagList);
  const baseUrl = new URL(window.location.href).origin;

  const navigate = useNavigate();

  useEffect(() => {
    fetch('../../mockupData/posts.json')
      .then((response) => response.json())
      .then((jsonData) => setPosts(jsonData));
  }, []);

  useEffect(() => {
    if (isClicked) {
      setDrawerOpen(isClicked);
    }
  }, [isClicked]);

  useEffect(() => {
    if (destId !== undefined) {
      const filteredPosts = posts.filter(
        (post: any) => post.dest.destId === destId
      );
      console.log('filteredPosts:', filteredPosts);
      setPosts(filteredPosts);
    }
  }, [destId]);

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
      if (!open) {
        if (onClose) {
          onClose();
        }
      }
    };

  const handleRemoveCategory = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (selectedTags && selectedTags.length === 0) {
      // 여기에 필요한 로직을 추가하세요
    } else if (selectedTags) {
      // 여기에 필요한 로직을 추가하세요
    }
  }, [selectedTags]);

  const renderTags = (tagsToRender: Tag[]) =>
    tagsToRender.map((tag, index) => (
      <CategoryItem key={tag.tag}>
        <span>{tag.name}</span>
        <IconButton
          size="small"
          edge="end"
          aria-label="delete"
          onClick={(event) => handleRemoveCategory(index, event)}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </CategoryItem>
    ));

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <DrawerHeader>
        🍊 제주행괌
        <div onClick={onClose}>
          <ChevronLeftIcon />
        </div>
      </DrawerHeader>
      <CategoryList>
        {selectedTags &&
          (selectedTags.length === 0
            ? renderTags(tags)
            : renderTags(selectedTags))}
      </CategoryList>
      <Divider />
      <ListComponent posts={posts} onPostClick={() => navigate('/post')} />
      <Divider />
      <Footer />
    </div>
  );

  return (
    <div>
      <ButtonTagStyle onClick={toggleDrawer(true)}>
        <MenuIcon
          style={{ width: '10px', height: '10px', marginRight: '3px' }}
        />
        조회
      </ButtonTagStyle>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
