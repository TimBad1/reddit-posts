import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notfound.module.css';

export function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Ошибка 404</h2>
        <p className={styles.description}>
          Страница, которую вы запрашиваете, не существует. Возможно введён не верный адрес. 
        </p>
        <Link className={styles.button} to='/'>На главную</Link>
      </div>
    </div>
  );
}
