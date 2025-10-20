"use client";
import styles from "./AdminTable.module.scss";
import {adminTableColumns} from "@/components/AdminTable/constants";
import {observer} from "mobx-react";
import {useAuth} from "@/contexts/authContext";
import {BsPencil, BsX} from 'react-icons/bs'


const AdminTable = observer(() => {
    const { users, user } = useAuth();
    const transformedUsers = users.filter(u => u.email != user?.email)

    console.log(transformedUsers, user)

    return (
        <div className={styles["admin-table-container"]}>
            <h1 className='text-center pb-[1rem]'>Admin Table</h1>
            <div className='w-full'>
                <table className='nax-w-[800px] mx-auto w-full '>
                    <thead>
                    <tr>
                        <th>
                            <div>
                                {adminTableColumns.firstName}
                            </div>
                        </th>
                        <th>
                            <div>
                                {adminTableColumns.lastName}
                            </div>
                        </th>
                        <th>
                            <div>
                                {adminTableColumns.email}
                            </div>
                        </th>
                        <th>
                            <div>
                                {adminTableColumns.roles}
                            </div>
                        </th>
                        <th>
                            <div>
                                {adminTableColumns.edit}
                            </div>
                        </th>
                        <th>
                            <div>
                                {adminTableColumns.delete}
                            </div>
                        </th>
                    </tr>
                    </thead>

                    {!transformedUsers ? <p> No users available </p> :
                        <tbody>
                        {transformedUsers.map(user => <tr key={user.id}>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.lastName}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.roles?.map(r => <span key={r.value}>{r.value} </span>)}
                            </td>
                            <td>
                                <button>
                                    <BsPencil className={styles.edit}/>
                                </button>
                            </td>
                            <td>
                                <button>
                                    <BsX className={styles.delete}/>
                                </button>

                            </td>
                        </tr>)}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
});

export default AdminTable;