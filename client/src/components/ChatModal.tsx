import { useEffect, useRef, useState } from "react";
import { useSocket } from "../services/socket-config";
import getUser from "../services/get-user";

interface ChatModalProps {
    selectedUser: {
        userId: string,
        username: string;
    };
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
}

export default function ChatModal({ selectedUser }: ChatModalProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const socket = useSocket();
    const inputRef = useRef<HTMLInputElement>(null);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const currentUserId = getUser()?.userId;

    useEffect(() => {
        try {
            socket?.on('receiveMessage', (message: Message) => {
                setMessages((messages: Message[]) => [...messages, message]);
            });

            return () => {
                socket?.off('receiveMessage');
            };
        } catch (error) {
            console.error('Error listening for messages:', error);
        };

    }, [currentUserId, selectedUser, socket]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'instant'});
    }, [messages]);

    const sendMessage = () => {
        const message = {
            senderId: currentUserId,
            receiverId: selectedUser.userId,
            content: input,
            isRead: false,
            createdAt : new Date(),
        };
        socket?.emit('sendMessage', message);
        setInput('');
        inputRef.current?.focus(); 
    };

    return (
        <div className="text-onSurface bg-onSurface/5 w-full min-h-[15rem] h-auto max-h-[20rem]
            rounded-lg border-2 border-onBackground/10 
            overflow-hidden relative"
        >
            <div className="overflow-y-auto h-full hide-scrollbar pt-[6px]">
                <p className="w-full text-center">Send a message to {selectedUser.username}</p>
                {messages.map((message, index) => (
                    <div className='w-full flex flex-col' key={index}>
                        <div className={`w-full flex px-[6px] 
                            ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`} 
                            key={index}
                        >
                            <p className={`py-[2px] px-2 my-[2px] rounded-lg max-w-[70%] w-fit flex flex-wrap 
                                ${message.senderId === currentUserId ? 'bg-primary text-onPrimary' : 'bg-onSurface/20 text-onSurface'}`}
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
        </div>
    )
}
