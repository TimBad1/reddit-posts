import React from 'react';
import { Actions } from './Actions';
import { CommentButton } from './CommentButton';
import styles from './controls.module.css';
import { KarmaCounter } from './KarmaCounter';

interface IControls {
  commentsCount: number;
  rating: number;
}

export function Controls({commentsCount, rating}: IControls) {
  return (
    <div className={styles.controls}>
      <KarmaCounter rating={rating}/>
      <CommentButton commentsCount={commentsCount}/>
      <Actions />
    </div>
  );
}
