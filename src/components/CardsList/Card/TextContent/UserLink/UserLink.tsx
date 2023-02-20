import React from 'react';
import styles from './userlink.module.css';

interface IUserLink{
  author: string;
  avatar: string;
}

export function UserLink({author, avatar}: IUserLink) {
  
  return (
    <div className={styles.userLink}>
    <img className={styles.avatar} src={avatar} alt={author} />
    <a className={styles.username} href="#user-url">{author}</a>
  </div>
  );
}
