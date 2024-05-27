import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } : any = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({
                email,
                password
            });
            navigate('/')
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };


    const isFormValid = () => {
        return email.trim() !== "" && password.trim() !== "";
    };

    return (
        <div className='text-onBackground 
        flex flex-col justify-center items-center h-screen w-screen pt-[5rem]'>
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
                    disabled={!isFormValid()}
                >
                    Login
                </button>
            </form>
            <div className='flex flex-col text-center'>
                <Link className='text-onBackground hover:text-secondary transition underline' to='/register'>Don't have an account?</Link>
                <Link className='text-onBackground hover:text-secondary transition underline' to="/forgot-password">Forgot password?</Link>
            </div>
            <ToastContainer />
        </div>
    );
};