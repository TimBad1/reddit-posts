import React from 'react';
import styles from './actions.module.css';
import { SaveButton } from './SaveButton/SaveButton';
import { ShareButton } from './ShareButton/ShareButton';

export function Actions() {
  return (
    <div className={styles.actions}>
      <ShareButton />
      <SaveButton />
    </div>
  );
}
