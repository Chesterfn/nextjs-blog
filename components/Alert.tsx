import { ReactNode } from 'react';
import styles from '../styles/alert.module.css';
import cn from 'classnames';

interface AlertProps {
    children: ReactNode; // 子元素
    type: 'success' | 'error'; // type 属性可以是 'success' 或 'error'
  }

export default function Alert({ children, type }:AlertProps) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  );
}