import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import io, { Socket } from 'socket.io-client';
import getToken from './get-token';

const BLOCKPARTY_API_URL = import.meta.env.VITE_BLOCKPARTY_API_URL;

export function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const initializeSocket = async () => {
            let token = getToken();
            if (!token) {
                await authContext?.refreshToken();
                token = getToken();
            }

            if (token) {
                const newSocket = io(BLOCKPARTY_API_URL, {
                    auth: {
                        token,
                    },
                    autoConnect: true,
                });

                newSocket.on('connect', () => {
                    console.log('Connected to socket server');
                });

                newSocket.on('connect_error', (error: any) => {
                    console.error('Connection error:', error);
                    if (error.message === 'Authentication error') {
                        handleTokenRefresh(newSocket);
                    }
                });

                newSocket.on('token_expired', () => {
                    console.log('Token expired. Refreshing token...');
                    handleTokenRefresh(newSocket);
                });

                setSocket(newSocket);
            }
        };

        const handleTokenRefresh = async (socket: Socket) => {
            try {
                await authContext?.refreshToken();
                const newToken = getToken();
                if (newToken) {
                    (socket.auth as { token: string }).token = newToken; // Add type assertion
                    socket.connect();
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };

        initializeSocket();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [authContext]);

    return socket;
}
