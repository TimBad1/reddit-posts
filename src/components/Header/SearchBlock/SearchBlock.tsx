import React from 'react';
import styles from './searchblock.module.css';
import { UserBlock } from './UserBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { IUserData } from '../../../store/me/reducer';

export function SearchBlock() {

  const loading = useSelector<RootState, boolean>(state => state.me.loading)
  const data = useSelector<RootState,IUserData>(state => state.me.data)

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.iconImg} username={data.name} loading={loading}/>
    </div>
  );
}
