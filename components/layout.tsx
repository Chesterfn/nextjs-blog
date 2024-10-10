import { ReactNode } from "react";
import styles from './layout.module.css'
interface LayoutProps {
    children: ReactNode; // 明确指定 children 的类型
}

export default function Layout({children}:LayoutProps) {
    return <div className={styles.container} >{children}</div>
}