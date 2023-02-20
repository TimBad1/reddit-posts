import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IPostsRequestData } from '../../../../../../store/postsContent/actions';
import { RootState } from '../../../../../../store/reducer';
import { ago } from '../../../../../../utils/functions/ago';
import { CommentFormContainer } from '../../../../../CommentForm/CommentFormContainer';
import { KarmaCounter } from '../../../Controls/KarmaCounter';
import { MenuItemsList } from '../../../Menu/MenuItemsList';
import { UserLink } from '../../UserLink';
import { CommentsList } from './CommentsList';
import styles from './post.module.css';

export function Post() {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams();  
  const navigate = useNavigate();
  
  function getModalData(id: string | undefined) {
    const postModal = useSelector<RootState, IPostsRequestData[]>(state => state.posts.data).find(item => item.id === id)
    return {
      author: postModal?.author || '',
      avatar: postModal?.avatar || '',
      commentsCount: postModal?.commentsCount || '',
      datePostUtc: postModal?.datePostUtc || 0,
      description: postModal?.description || '',
      id: postModal?.id || '',
      previewImg: postModal?.previewImg || '',
      rating: postModal?.rating || 0,
      subreddit: postModal?.subreddit || '',
      title: postModal?.title || '',
    }
  }

  const modal = getModalData(id);
  
  const [commentId, setCommentId] = useState('');
  const [authorComment, setAuthorComment] = useState('');

  function putCommentData (postId: string, author: string) {
    setAuthorComment(author);
    setCommentId(postId);
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if(event.target instanceof Node && !ref.current?.contains(event.target)) {
        navigate('/')
      }
    }
    
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const node = document.querySelector('#modal_root');

  if(!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <div className={styles.modalHeadingWrap}>
        <KarmaCounter rating={5}/>
        <div className={styles.modalHeadingTextWrap}>
          <h2>{modal.title}</h2>
          <div className={styles.modalHeadingWrap}>
            <span className={styles.publishedLabel}>Опубликовано {ago(modal.datePostUtc)}</span>
            <UserLink author={modal.author} avatar={modal.avatar} />
            <div className={styles.modalSubreddit}>{modal.subreddit}</div>
          </div>
        </div>
      </div>
        <img className={styles.modalImg} src={modal.previewImg} alt={'title'} />
      <p>
        {modal.description}
      </p>
      <MenuItemsList author={modal.author} postId={modal.id} direction={'row'} putCommentData={putCommentData} />

      <CommentFormContainer commentId={commentId} authorComment={authorComment} />
      <CommentsList putCommentData={putCommentData} id={modal.id}/>
    </div>
  ), node);
}
