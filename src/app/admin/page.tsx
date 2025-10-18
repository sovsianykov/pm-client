import AdminContainer from "@/containers/Admin/AdminContainer";
import {getAllUsers} from "@/http/getAllUsers";


export default async function AdminPage() {

    const users = await getAllUsers();
    console.log('all users' ,users);

    return (
        <div className="p-8 mt-[3rem]">
            <AdminContainer/>
        </div>
    );
}