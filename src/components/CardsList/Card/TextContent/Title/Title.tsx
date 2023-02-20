import React from 'react';
import { Link } from 'react-router-dom';
import styles from './title.module.css';

interface ITitle {
  id: string;
  title: string;
  rating: number;
  author: string;
  commentsCount: number;
  avatar: string;
  previewImg: string;
  datePostUtc: number;
  description: string;
  subreddit: string;
}

export function Title(props : ITitle) { 
  const postLink = `/posts/${props.id}`;
  
  return (
    <h2 className={styles.title}>
      <Link to={postLink} className={styles.postLink}>
        {props.title}
      </Link>
    </h2>
  );
}
