import React, {ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { updateComment } from '../../../store/actions';
import { CommentForm } from '../CommentForm';

interface ICommentFormProps {
  authorComment: string;
  commentId: string;
}

export function CommentFormContainer({authorComment, commentId}: ICommentFormProps) {
  const value = useSelector<RootState, string>(state => state.commentText);
  const userName = useSelector<RootState, string>(state => state.repliesComment.user)
  const dispatch = useDispatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(event.target.value))
  }
  
  useEffect(()=> {
    if(textareaRef.current) {
      textareaRef.current.focus();
      dispatch(updateComment(`${userName ? `${userName}, ` :  ''}`))
    }
  }
,[userName])

  function handleSubmit(event: FormEvent) {
    event.preventDefault(); 
    console.log(value);
  }
  
  return (
    <CommentForm 
      // value={value}
      // onChange={handleChange}
      // onSubmit={handleSubmit}
      // textareaRef={textareaRef}
      // authorComment={authorComment}
      // commentId={commentId}
    />
  );
}
