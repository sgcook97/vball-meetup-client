// Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../config/axiosConfig';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const navigate = useNavigate();

    const api = useApi();

    const handleRegister = async () => {
        try {
            await api.post('/auth/register', {
                username,
                email,
                password,
                skillLevel,
            });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className='text-onBackground relative pt-[3.5rem] 
            flex flex-col justify-center items-center h-screen
            w-screen'
        >
            <h2>Register</h2>
            <form action="" className='m-2 flex flex-col items-center
                justify-center max-w-[20rem] min-w-[15rem] w-[80%] gap-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}
            >
                <input className='rounded-md w-full bg-onBackground/[0.01]
                    border-2 border-onBackground/10 pl-1 py-1'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}    
                />
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
                <input className='rounded-md w-full bg-onBackground/[0.01]
                    border-2 border-onBackground/10 pl-1 py-1'  
                    type="text"
                    placeholder='Skill Level'
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                />
                <button className='bg-primary text-onPrimary w-[5rem] h-[2.2rem]
                    rounded-md hover:bg-secondary hover:text-onSecondary transition 
                    duration-200'
                    type='submit'
                >
                    Register
                </button>
            </form>
            <div>
                <a className='text-onBackground hover:text-secondary transition underline' href='/login'>Already have an account?</a>
            </div>
        </div>
    );
};