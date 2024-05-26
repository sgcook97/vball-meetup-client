import { useEffect, useState } from 'react';
import { useSocket } from '../services/socket-config';
import useApi from '../config/axiosConfig';
import React from 'react';

interface OnlineUser {
    userId: string;
    username: string;
}

interface PrevChatUser {
    _id: string;
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
    const [previousChatUsers, setPreviousChatUsers] = useState<PrevChatUser[]>([]);
    const socket = useSocket();
    const api = useApi();

    useEffect(() => {
        if (!socket) return;

        socket.on('onlineUsers', (users: OnlineUser[]) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('onlineUsers');
        };
    }, [socket]);

    useEffect(() => {
        const fetchPreviousChatUsers = async () => {
            try {
                const response = await api.get(`/message/chats/previous/${currentUser}`);
                const offlineUsers = response.data.filter((user: OnlineUser) => !onlineUsers.some(onlineUser => onlineUser.userId === user.userId));
                setPreviousChatUsers(offlineUsers);
            } catch (error) {
                console.error('Error fetching previous chat users:', error);
            }
        };

        fetchPreviousChatUsers();
    }, [currentUser, api]);

    return (
        <div className='flex flex-col w-1/3 min-w-[8rem] h-[30rem] justify-start items-start text-onSurface bg-onSurface/15
            rounded-l-lg border-2 border-r-0 border-onBackground/10 overflow-hidden px-2 py-1'
        >
            <div className='overflow-y-auto hide-scrollbar'>
                <div className=''>
                    <h2 className="font-semibold text-xl mb-1">Online Users</h2>
                    {/* check if anyone else is online */}
                    {onlineUsers.length === 1 ?
                        <p className='text-sm'>No online users</p> 
                        : 
                        <ul className='flex flex-col'>
                            {onlineUsers.map((user) => (
                                currentUser !== user.userId && 
                                <li key={user.userId} 
                                    onClick={selectedUser === user.userId ? () => handleClearSelection() : () => onUserSelect(user.userId)}
                                    className={`hover:cursor-pointer w-fit bg-onSurface/20 flex items-center justify-center
                                    rounded-full py-1 px-2 my-2 hover:bg-secondary hover:text-onSecondary transition
                                    ${selectedUser === user.userId ? 'bg-secondary text-onSecondary' : ''}`}
                                >
                                    {/* icon to show that user is online */}
                                    <span className='w-2 h-2 bg-primary animate-pulse rounded-full inline-block mr-1'></span>
                                    {user.username}
                                    
                                </li>
                            ))}
                        </ul>
                    }
                </div>

                {/* display previous chats */}
                {previousChatUsers.length > 0 &&
                    <React.Fragment>
                        <div className='w-full h-[2px] bg-onBackground/20 my-2'></div>
                        <div>
                            <h2 className="font-semibold text-xl mb-1">Previous Chats</h2>
                            <ul className='flex flex-col'>
                                {previousChatUsers.filter(user => !onlineUsers.some(onlineUser => onlineUser.userId === user._id)).map((user) => (
                                    <li key={user._id} 
                                        onClick={selectedUser === user._id ? () => handleClearSelection() : () => onUserSelect(user._id)}
                                        className={`hover:cursor-pointer w-fit bg-onSurface/20
                                        rounded-full py-1 px-2 my-1 hover:bg-secondary hover:text-onSecondary transition
                                        ${selectedUser === user._id ? 'bg-secondary text-onSecondary' : ''}`}
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
}
