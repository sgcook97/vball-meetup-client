import { useEffect, useState } from 'react';
import { useSocket } from '../services/socket-config';

interface OnlineUser {
    userId: string;
    username: string;
}

interface OnlineUsersProps {
    selectedUser: string;
    currentUser: string;
    onUserSelect: (userId: string) => void;
    handleClearSelection: () => void;
}

export default function OnlineUsers({ onUserSelect, selectedUser, currentUser, handleClearSelection }: OnlineUsersProps) {
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('onlineUsers', (users: OnlineUser[]) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('onlineUsers');
        };
    }, [socket]);

    return (
        <div className='flex flex-col w-1/3 h-[30rem] justify-start items-start text-onSurface bg-onSurface/15
            rounded-l-lg border-2 border-r-0 border-onBackground/10 overflow-hidden px-2 py-1'
        >
            <h2 className="font-semibold text-xl">Online Users</h2>
            <ul className='w-full'>
                {onlineUsers.map((user) => (
                    currentUser !== user.userId && <li key={user.userId} 
                        onClick={selectedUser === user.userId ? () => handleClearSelection() : () => onUserSelect(user.userId)}
                        className={`hover:cursor-pointer w-auto bg-onSurface/20 inline-block
                        rounded-full py-1 px-2 my-2 hover:bg-secondary hover:text-onSecondary transition
                        ${selectedUser === user.userId ? 'bg-secondary text-onSecondary' : ''}`}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
