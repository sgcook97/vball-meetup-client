import React from 'react'
import { IoMdHome } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaPlusSquare } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Dropdown from './Dropdown';

type HeaderProps = {
    toggleTheme: () => void;
}

export default function Header({ toggleTheme } : HeaderProps) {
    return (
        <div className='text-primary flex justify-between items-center w-full
        h-[3.5rem] px-5 py-3 fixed top-0 z-50 bg-background border-b border-b-onBackground/10'>
            <h2 className='text-onBackground text-[2rem]'>blockparty</h2>
            <nav className='-translate-x-[12px] hidden md:flex'>
                <ul className='flex gap-2 justify-center items-center text-onBackground'>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[2.5rem] w-[3rem]'>
                        <a href="/"><IoMdHome size={28}/></a>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[2.5rem] w-[3rem]'>
                        <a href="/find-group"><FaUserGroup size={28}/></a>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[2.5rem] w-[3rem]'>
                        <a href="/create-post"><FaPlusSquare size={28}/></a>
                    </li>
                    <li className='flex justify-center items-center transition rounded-lg
                    hover:opacity-100 hover:bg-onBackground/10 h-[2.5rem] w-[3rem]'>
                        <a href="/profile"><FaUser size={24}/></a>
                    </li>
                </ul>
            </nav>
            <button className='bg-primary text-onPrimary hover:bg-secondary
            rounded-lg py-1 px-2 transition duration-200 hidden md:flex' 
            onClick={toggleTheme}>
                Toggle Theme
            </button>
            <div className='md:hidden flex'>
                <Dropdown />
            </div>
        </div>
    )
}
