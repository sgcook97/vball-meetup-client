import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const BLOCKPARTY_API_URL: string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BLOCKPARTY_API_URL}/auth/login`, {
                email,
                password,
            });
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='text-onBackground relative pt-[3.5rem] 
        flex flex-col justify-center items-center h-screen w-screen'>
            <h2>Login</h2>
            <form action="" className='m-2 flex flex-col items-center
                justify-center max-w-[20rem] min-w-[15rem] w-[80%] gap-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <input className='rounded-md w-full bg-onBackground/[0.01]
                    border-2 border-onBackground/10 pl-1 py-1' 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input className='rounded-md w-full bg-onBackground/[0.01]
                    border-2 border-onBackground/10 pl-1 py-1' 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-primary text-onPrimary w-[5rem] h-[2.2rem]
                    rounded-md hover:bg-secondary hover:text-onSecondary transition 
                    duration-200'
                    type='submit'
                >
                    Login
                </button>
            </form>
        </div>
    );
};