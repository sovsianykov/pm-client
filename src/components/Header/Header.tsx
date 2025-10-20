"use client";

import styles from './Header.module.scss'
import {navigationItems} from "@/components/Header/constants";
import NavItem from "@/components/Header/NavItem";
import {useAuth} from "@/contexts/authContext";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import BlueButton from "@/components/BlueButton/BlueButton";
import {useWorkedHours} from "@/contexts/workedHoursContext";
import useIsMobile from "@/components/Header/hooks/isMobile";
import {useEffect} from "react";


export default observer(function Header() {

    const auth = useAuth();
    const hoursStore = useWorkedHours()
    const firstName = toJS(auth.user?.firstName)
    const lastName = toJS(auth.user?.lastName)
    const isLogged = toJS(auth.isAuth)

    const isMobile = useIsMobile();


    const loggOutHandler = () => {
        auth.logout();
        hoursStore.clean()
    }

    return (
        <div className={styles.header}>
            <div className={styles['menu-content']}>
                <div className={styles['subContainer']}>
                    {isLogged ?
                        <div className='text-[16px] tracking-wider ml-[2rem] gap-2 flex h-[45.5px] items-center'>
                            <div className='px-[1rem]'>
                                   <span>
                               {firstName}
                                   </span>
                                <span>
                               {lastName}
                                </span>
                            </div>

                            <div className='pr-2'>
                                <BlueButton text="Logout" onClick={loggOutHandler}/>
                            </div>
                        </div> :
                        <div className="text-[18px] ml-[3rem]">
                            Guest
                        </div>}
                    <div>
                        {isMobile ? <>
                            <div className="text-[1.5rem] " id="burger">☰</div>
                        </> : <ul className={styles.navigation}>
                            {navigationItems.map((item) => (
                                <NavItem text={item.title} path={item.path} key={item.id}/>))}
                        </ul>}

                    </div>
                </div>
            </div>
        </div>
    );
});

