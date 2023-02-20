import styles from './menuitemslist.module.css';
import { BlockIcon, CommentIcon, SaveIcon, ShareIcon, WarningIcon } from '../../../../Icons';
import { useDispatch } from 'react-redux';
import { repliesComment } from '../../../../../store/repliesComment/actions';
import { Text, EColors } from '../../../../customs/Text';

interface IMenuItemsListProps {
  postId: string;
  direction: TDirection;
  author: string;
  putCommentData: (postId: string, author: string) => void;
}

type TDirection = 'column'|'row'|undefined

export function MenuItemsList({ postId, author, direction = 'column', putCommentData }: IMenuItemsListProps) {
  const dispatch = useDispatch()

  function handlerClick (id: string, author: string) {
    dispatch(repliesComment({ user: author, id: id}))
  }

  return (
    <ul className={styles.menuItemList} style={{flexDirection: direction, display: 'flex'}}>
      {/* <li className={styles.menuItem} onClick={() => putCommentData(postId, author)} > */}
      <li className={styles.menuItem} onClick={() => handlerClick(postId, author)} >
        <CommentIcon />
        <Text size={12} color={EColors.grey66}>Комментарии</Text>
      </li>

      <li className={styles.menuItem} onClick={() => console.log('Поделиться')}>
        <ShareIcon />
        <Text size={12} color={EColors.grey66}>Поделиться</Text>
      </li>

      <li className={styles.menuItem} onClick={() => console.log(postId)}>
        <BlockIcon />
        <Text size={12} color={EColors.grey66}>Скрыть</Text>
      </li>

      <li className={styles.menuItem}>
        <SaveIcon />
        <Text size={12} color={EColors.grey66}>Сохранить</Text>
      </li>

      <li className={styles.menuItem}>
        <WarningIcon />
        <Text size={12} color={EColors.grey66}>Пожаловаться</Text>
      </li>
    </ul>
    );
}
