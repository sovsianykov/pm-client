"use client";

import styles from './Header.module.scss'
import {navigationItems} from "@/components/Header/constants";
import NavItem from "@/components/Header/NavItem";
import {useAuth} from "@/contexts/authContext";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import BlueButton from "@/components/BlueButton/BlueButton";
import {useRouter} from "next/navigation";

export default observer(function Header() {

    const router = useRouter();

    const auth = useAuth();
    const firstName = toJS(auth.user?.firstName)
    const lastName = toJS(auth.user?.lastName)
    const isLogged = toJS(auth.isAuth)
    const loggOutHandler= () => { auth.logout()}

    return (
        <div className={styles.header}>
            <div className={styles['menu-content']}>
                <div className={styles['subContainer']}>
                    {isLogged ? <div className='text-[16px] tracking-wider ml-[2rem] gap-4 flex  items-center'>
                            <span>
                               {firstName}
                            </span>
                            <span>
                               {lastName}
                            </span>
                            <div className='mr-1'>
                                <BlueButton text="Logout" onClick={loggOutHandler}/>
                            </div>
                        </div> :
                        <div className="text-[18px] ml-[3rem]">
                            Guest
                        </div>}



                    <div className={styles['menu-container']}>

                        <ul className={styles.navigation}>
                            {navigationItems.map((item) => (
                                <NavItem text={item.title} path={item.path} key={item.id}/>))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});

