import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../services/socket-config';
import useApi from '../config/axiosConfig';
import React from 'react';

interface ChatProps {
    currentUser: string;
    selectedUser: string;
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
}

function FormatTime(date: Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDay() === new Date().getDay() ? 'Today' : days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function shouldDisplayDate(prevDate: Date, currDate: Date) {
    if (prevDate.getDate() !== currDate.getDate()) {
        return true;
    }
    const timeDifference = Math.abs(currDate.getTime() - prevDate.getTime());
    const minutesDifference = timeDifference / (1000 * 60);
    if (minutesDifference > 60) {
        return true;
    }
    return false;
}

export default function Chat({ currentUser, selectedUser } : ChatProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
    const socket = useSocket();
    const api = useApi();
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // retrieve messages between current user and selected user
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/message/${currentUser}/${selectedUser}`);
                const data: Message[] = await response.data;
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (selectedUser) {
            fetchMessages();
        }

        try {
            socket?.on('receiveMessage', (message: Message) => {
                setMessages((prevMessages: Message[]) => [...prevMessages, message]);
            });

            socket?.on('unreadMessages', (messages: Message[]) => {
                setUnreadMessages(messages);
            });

            return () => {
                socket?.off('receiveMessage');
                socket?.off('unreadMessages');
            };
        } catch (error) {
            console.error('Error listening for messages:', error);
        };

    }, [currentUser, selectedUser, socket]);

    // scrolls to bottom of chat when opening or a new message is received
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'instant'});
    }, [messages]);

    // marks messages as read when user reads them
    useEffect(() => {
        if (selectedUser) {
            socket?.emit('readMessages', selectedUser);
        }
    }, [selectedUser, socket]);

    const sendMessage = () => {
        const message = {
            senderId: currentUser,
            receiverId: selectedUser,
            content: input,
            isRead: false,
            createdAt : new Date(),
        };
        socket?.emit('sendMessage', message);
        setInput('');
        inputRef.current?.focus(); 
    };

    return (
        <div className='text-onSurface bg-onSurface/5 w-2/3 h-[30rem] rounded-r-lg border-2 border-l-0 border-onBackground/10 overflow-hidden relative'>
            {selectedUser ? 
                <React.Fragment>
                    <div className='overflow-y-auto h-full hide-scrollbar pt-[6px]' id='chat'>
                        {messages.length === 0 && <p className='text-center text-onSurface'>No messages.</p>}
                        {messages.map((message, index) => (
                            <div className='w-full flex flex-col' key={index}>
                                {index === 0 && <p className='text-center text-onSurface/50 text-xs my-2'>{FormatTime(new Date(message.createdAt))}</p>}
                                {(index > 0 && shouldDisplayDate(new Date(messages[index - 1].createdAt), new Date(message.createdAt))) && (
                                    <p className='text-center text-onSurface/50 text-xs my-2'>{FormatTime(new Date(message.createdAt))}</p>
                                )}
                                {unreadMessages.length > 0 && message._id === unreadMessages[0]._id && 
                                    <p className='text-center text-onSurface/50 text-xs my-2'>New messages</p>
                                }
                                <div className={`w-full flex px-[6px] 
                                    ${message.senderId === currentUser ? 'justify-end' : 'justify-start'}`} 
                                    key={index}
                                >
                                    <p className={`py-[2px] px-2 my-[2px] rounded-lg max-w-[70%] w-fit flex flex-wrap 
                                        ${message.senderId === currentUser ? 'bg-primary text-onPrimary' : 'bg-onSurface/20 text-onSurface'}`}
                                    >
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                            
                        ))}
                        <div ref={messageEndRef} className='h-[2.5rem]'></div>
                    </div>
                    <div className='w-full mt-1 absolute bottom-0 bg-surface'>
                        <input
                            ref={inputRef}
                            className='border-2 border-onSurface/10 bg-onSurface/5 text-onSurface 
                                w-[calc(100%-4rem)] px-2 py-1 focus:outline-none'
                            type="text"
                            placeholder='Type a message...'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => (e.key === 'Enter' && input !== '') && sendMessage()}
                        />
                        <button 
                            className='bg-secondary border-2 border-secondary 
                            text-onSecondary px-2 py-1 rounded-br-lg w-[4rem]
                            hover:bg-secondary/80 hover:border-secondary/80 transition'
                            disabled={input === ''}
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </React.Fragment>
            : 
                <div className='flex justify-center items-center h-full text-center'>
                    <h2 className='text-onSurface text-center text-2xl w-[60%]'>Select a user to chat with</h2>
                </div>
            }
        </div>
    );
};