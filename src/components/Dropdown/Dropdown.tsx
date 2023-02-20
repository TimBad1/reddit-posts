import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.css';
import { MenuIcon } from '../Icons';
import { Menu } from '../CardsList/Card/Menu';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  id: string;
  author: string;
  coordinates?: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

const NOOP = () => {};

export function Dropdown({ 
  button, 
  children, 
  isOpen, 
  onClose = NOOP, 
  onOpen = NOOP, 
  id, 
  author,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  const dropRef = useRef<HTMLDivElement>(null);
  const coordinates = dropRef.current 
    ? dropRef.current?.getBoundingClientRect()
    : {top:0 , left:0, height: 0, width: 0}

      function getPositionMenu (coordinates: any) {
    const screenWidth = screen.width;
    const y = coordinates.top + pageYOffset + coordinates.height;
    const x = screenWidth - (coordinates.left + pageXOffset) - (screenWidth >= 1024? coordinates.width / 2 : coordinates.width)  
    return {top: y, rigth: x}
  }

  const position = getPositionMenu(coordinates)
  
  return (
    <div className={styles.menu} onClick={handleOpen} ref={dropRef}>
      <button className={styles.menuButton} >
        <MenuIcon />
      </button>
      {isDropdownOpen && (
        <div style={{top: position.top, right: position.rigth}} className={styles.dropdownWrap}>
          <Menu
            isDropdownOpen={isDropdownOpen}
            postId={id} 
            author={author}
            onClose={() => {setIsDropdownOpen(false)}} 
            coordinates={coordinates}
          />
        </div>
      )}
    </div>    
  );
}
