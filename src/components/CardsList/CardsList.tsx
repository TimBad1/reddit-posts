import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { IPostsRequestData, postsRequestAsync } from '../../store/postsContent/actions';

import { RootState } from '../../store/reducer';
import { Card } from './Card';
import { Post } from './Card/TextContent/Title/Post';
import styles from './cardslist.module.css';

export function CardsList() {
  const dispatch = useDispatch();
  const posts = useSelector<RootState, IPostsRequestData[]>(state => state.posts.data);
  const loading = useSelector<RootState, boolean>(state => state.posts.loading);
  const token = useSelector<RootState, string>(state => state.getToken);
  const [nextafter, setNextAfter] = useState('');
  const [errorLoading, setErrorLoading] = useState('');

  const bottomOfList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        dispatch(postsRequestAsync())
      }
      
    }, {
      rootMargin: '100px',
    })

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current)
    }
    
    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current)
      } 
    }
  }, [bottomOfList.current, nextafter, token])

  return (
    <>
    <ul className={styles.cardsList}>
      {posts.length === 0 && !loading && !errorLoading && (
        <div className={styles.title}>Нет ни одного поста</div>
      )}
      {posts.map(({id, author, title, rating, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}: IPostsRequestData) => 
        <Card 
          key={id}
          id={id}
          author={author}
          title={title}
          rating={rating}
          commentsCount={commentsCount}
          avatar={avatar}
          previewImg={previewImg}
          datePostUtc={datePostUtc} 
          description={description}
          subreddit={subreddit}
        />)}

      <div ref={bottomOfList} />

      { loading && (
        <p className={styles.title}>Загрузка...</p>
      )}

      { errorLoading && (
        <div role='alert' className={styles.title}>
        {errorLoading}
      </div>
      )}
      
    </ul>
    <Routes>
      <Route path=':id' element={<Post />}/>
    </Routes>
    </>
  )

  
}
