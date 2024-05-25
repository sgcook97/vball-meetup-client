import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../services/socket-config';
import useApi from '../config/axiosConfig';
import React from 'react';

interface ChatProps {
    currentUser: string;
    selectedUser: string;
}

interface Message {
    senderId: string;
    receiverId: string;
    content: string;
}

export default function Chat({ currentUser, selectedUser } : ChatProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = useSocket();
    const api = useApi();
    const messageEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log(currentUser, selectedUser);
                const response = await api.get(`/message/${currentUser}/${selectedUser}`);
                const data: Message[] = await response.data;
                setMessages(data);
                console.log('Messages:', data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        try {
            socket?.on('receiveMessage', (message: Message) => {
                setMessages((prevMessages: Message[]) => [...prevMessages, message]);
            });

            return () => {
                socket?.off('receiveMessage');
            };
        } catch (error) {
            console.error('Error listening for messages:', error);
        };

    }, [currentUser, selectedUser, socket]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'instant'});
    }, [messages]);

    const sendMessage = () => {
        const message: Message = {
            senderId: currentUser,
            receiverId: selectedUser,
            content: input,
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
                            <div className={`w-full flex px-[6px] 
                                ${message.senderId === currentUser ? 'justify-end' : 'justify-start'}`} 
                                key={index}
                            >
                                <p className={`py-[2px] px-2 my-[2px] rounded-lg
                                    ${message.senderId === currentUser ? 'bg-primary text-onPrimary' : 'bg-onSurface/20 text-onSurface'}`}
                                >
                                    {message.content}
                                </p>
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
                            className='bg-secondary border-2 border-secondary text-onSecondary px-2 py-1 rounded-br-lg w-[4rem]'
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