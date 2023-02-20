import React, { useEffect, useRef, useState } from 'react';
import styles from './menu.module.css';
import ReactDOM from 'react-dom';
import { MenuItemsList } from './MenuItemsList';
import { Text, EColors } from '../../../customs/Text';

interface IMenuProps {
  postId: string;
  author: string;
  onClose?: () => void;
  isDropdownOpen: boolean;
  coordinates?: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

export function Menu({ postId, author, onClose, coordinates, isDropdownOpen}: IMenuProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  function getPositionMenu (coordinates: any) {
    const screenWidth = screen.width;
    const y = coordinates.top + pageYOffset + coordinates.height;
    const x = screenWidth - (coordinates.left + pageXOffset) - (screenWidth >= 1024? coordinates.width / 2 : coordinates.width)  
    
    return {top: y, rigth: x}
  }

  const position = getPositionMenu(coordinates)
  
  useEffect(() => {
    function handleClick(event: MouseEvent) {
        onClose?.()
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const node = document.querySelector('#dropdown_root');
  
  if(!node) return null;

  const [commentId, setCommentId] = useState('');
  const [authorComment, setAuthorComment] = useState('');
  function putCommentData (postId: string, author: string) {
    setAuthorComment('');
    setCommentId('');
  }

  return ReactDOM.createPortal((
    <div className={styles.menu} style={{top: position.top, right: position.rigth}}>
      <MenuItemsList postId={postId} author={author} direction={'column'} putCommentData={putCommentData}/>


      <button className={styles.closeButton}>
        <Text mobileSize={12} size={14} color={EColors.grey66}>
          Закрыть
        </Text>
      </button>
    </div>
    ), node);
}
