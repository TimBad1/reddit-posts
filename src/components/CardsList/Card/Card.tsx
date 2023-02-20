import React from 'react';
import { IPostsRequestData } from '../../../store/postsContent/actions';
import { generateId } from '../../../utils/generateRandomIndex';
import { Dropdown } from '../../Dropdown';
import { GenericList } from '../../GenericList';
import styles from './card.module.css';
import { Controls } from './Controls';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

const LIST = [ 
  { As: 'li' as const, className: 'menuItem', text: 'Скрыть'}, 
  { As: 'li' as const, className: 'menuItem', text: 'Пожаловаться'}, 
].map(generateId)



export function Card({id, author, title, rating, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}: IPostsRequestData) {
  return (
    <li className={styles.card}>
      <TextContent 
        title={title} 
        author={author} 
        avatar={avatar} 
        datePostUtc={datePostUtc} 
        id={id} 
        rating={rating} 
        commentsCount={commentsCount} 
        previewImg={previewImg}
        description={description}
        subreddit={subreddit}
        />
      <Preview title={title} previewImg={previewImg}/>
      <Dropdown button={<button />} id={id} author={author}>
        <GenericList list={LIST} />
      </Dropdown>
      <Controls commentsCount={commentsCount} rating={rating}/>
    </li>
  );
}
