import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsRequestAsync, IPostsComments } from '../../../../../../../store/commentsPost/actions';
import { RootState } from '../../../../../../../store/reducer';
import { Comment } from './Comment/Comment';
import styles from './commentslist.module.css';

interface ICommentsListProps {
  putCommentData: (postId: string, author: string) => void;
  id: string;
}


export function CommentsList({putCommentData, id}: ICommentsListProps ) {
  const token = useSelector<RootState>(state => state.getToken);
  const dispatch = useDispatch();
  const comments = useSelector<RootState, IPostsComments[]>(state => state.comments.data)
  const loading = useSelector<RootState, boolean>(state => state.comments.loading)
  
  useEffect(() => {
    if (!token) return;    
    dispatch(commentsRequestAsync(id))
  },[token])
  
  if (loading) {
    return (
      <p>Загрузка комментариев...</p>
    )
  }

  return (comments && comments.length > 0 
    ) ? (
      <ul className={styles.commentsList}>
        {comments.map(({ id, author, body, likes, subreddit, replies, fullname, created_utc}) => 
          <Comment
            putCommentData={putCommentData}
            key={id}
            id={id}
            author={author}
            body={body}
            likes={likes}
            subreddit={subreddit}
            replies={replies}
            fullname={fullname}
            created_utc={created_utc}
          />
        )}
      </ul>
    ) : (
      <p>пока нет комментариев</p>
    )
}
