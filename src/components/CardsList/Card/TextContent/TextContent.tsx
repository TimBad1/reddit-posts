import React from 'react';
import { ago } from '../../../../utils/functions/ago';
// import { ago } from '../../../functions/ago';
import styles from './textContent.module.css';
import { Title } from './Title';
import { UserLink } from './UserLink';

interface ITextContent {
  author: string;
  title: string;
  avatar: string;
  datePostUtc: number;
  id: string;
  rating: number;
  commentsCount: number;
  previewImg: string;
  description: string;
  subreddit: string;
}

export function TextContent({author, title, avatar, datePostUtc, id, rating, commentsCount, previewImg, description, subreddit}: ITextContent) {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <UserLink author={author} avatar={avatar}/>
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>Опубликовано {ago(datePostUtc)}</span>  
        </span>
      </div>
      <Title 
        title={title}
        id={id}
        rating={rating}
        author={author}
        avatar={avatar}
        datePostUtc={datePostUtc}
        commentsCount={commentsCount}
        previewImg={previewImg}
        description={description}
        subreddit={subreddit}  
      />
    </div>
  );
}
