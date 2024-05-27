import { useContext } from "react";
import { IoMdHome, IoMdMail } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Dropdown from './Dropdown';
import { Switch } from "@material-tailwind/react";
import Logout from "./Logout";
import { AuthContext } from "../services/AuthContext";
import { Link } from "react-router-dom";

type HeaderProps = {
    currentTheme: string,
    toggleTheme: () => void;
}

export default function Header({ currentTheme, toggleTheme } : HeaderProps) {
    
    const { currentUser } : any = useContext(AuthContext);
    
    return (
        <div className='text-primary flex justify-center items-center w-full
        h-[3.5rem] px-5 py-3 fixed top-0 z-50 bg-background border-b border-b-onBackground/10'>
            <h2 className='absolute left-4 text-onBackground text-[2rem]'><Link className="text-primary" to="/">block</Link><Link className="text-secondary" to="/">party</Link></h2>
            <nav className='hidden md:flex'>
                <ul className='flex gap-6 justify-center items-center text-onBackground'>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[3rem] w-[4rem]'>
                        <Link to='/'><IoMdHome size={28}/></Link>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[3rem] w-[4rem]'>
                        <Link to="/find-group"><FaUserGroup size={28}/></Link>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[3rem] w-[4rem]'>
                        <Link to="/create-post"><FaPlusSquare size={28}/></Link>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[3rem] w-[4rem]'>
                        <Link to="/chat"><IoMdMail size={28}/></Link>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[3rem] w-[4rem]'>
                        <Link to="/profile"><FaUser size={24}/></Link>
                    </li>
                </ul>
            </nav>
            <div className="absolute right-4 flex justify-center items-center gap-5">
                {currentUser ? 
                    <Logout /> :
                    <Link className="text-onBackground hover:text-secondary transition" to="/login">Login</Link>
                }
                {currentTheme === 'dark' ?
                    <Switch onClick={toggleTheme} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} /> :
                    <Switch defaultChecked onClick={toggleTheme} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                }
                <div className='md:hidden flex'>
                    <Dropdown />
                </div>
            </div>
        </div>
    )
}
