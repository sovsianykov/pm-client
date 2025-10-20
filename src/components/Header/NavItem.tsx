import React from 'react';
import Link from "next/link";
import styles from './Header.module.scss'
import {usePathname} from "next/navigation";
import classNames from "classnames";
const NavItem = ({text,path}:{text:string; path:string}) => {

    const pathname = usePathname();

    const isActive =
        pathname === path

    return (
        <li className={classNames(styles['nav-item'], {
            [styles.active]: isActive,
        })}>
            <Link href={path}>{text}
                <span  className={styles['arrow-down']}/>
            </Link>
        </li>
    );
};

export default NavItem;