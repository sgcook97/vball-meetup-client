import { useState } from "react";
import Chat from "../components/Chat";
import getUser from "../services/get-user";
import OnlineUsers from "../components/OnlineUsers";


export default function ChatPage() {
    const currentUser = getUser()?.userId;

    const [selectedUser, setSelectedUser] = useState('');

    const handleUserSelect = (userId: string) => {
        setSelectedUser(userId);
        console.log('Selected user:', selectedUser);
    };

    const handleClearSelection = () => {
        setSelectedUser('');
    };

    return (
        <div className='text-onBackground relative pt-[5rem] 
            flex flex-col justify-center items-center w-full'>
            <h1 className="font-semibold text-3xl mb-4">Chat</h1>
            <div className="flex justify-center max-w-[40rem] w-[90%] min-w-[20rem]">
                <OnlineUsers currentUser={currentUser} onUserSelect={handleUserSelect} selectedUser={selectedUser} handleClearSelection={handleClearSelection}/>
                <Chat currentUser={currentUser} selectedUser={selectedUser} />
            </div>
        </div>
    );
}
