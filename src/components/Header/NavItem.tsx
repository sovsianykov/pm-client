import React from 'react';
import Link from "next/link";
import styles from './Header.module.scss'

const NavItem = ({text,path}:{text:string; path:string}) => {
    return (
        <li className='h-[1rem] text-[1rem] py-[10px] mx-[5px] flex items-center pr-[26px] font-[500] tracking-wide'>
            <Link href={path}>{text}
                <span  className={styles['arrow-down']}/>
            </Link>
        </li>
    );
};

export default NavItem;