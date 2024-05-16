import React, { useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { CgMenu } from "react-icons/cg";

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <CiMenuBurger 
                size={25}
                className='text-onBackground hover:text-onBackground/80
                    transition duration-100 hover:ease-in' 
                onClick={toggleMenu}
            />
            { isOpen && (
                <div className="absolute right-0 mt-2 mr-2 w-44 rounded-md border-solid 
                    border-onBackground/10 border-[0.5px] bg-background flex">
                    <ul className='w-full'>
                        <li>
                            <a
                                href="/" 
                                onClick={closeMenu}
                                className='hover:text-onBackground/80 text-onBackground  
                                transition duration-200 hover:ease-in pl-1'
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/find-group" 
                                onClick={closeMenu}
                                className='hover:text-onBackground/80 text-onBackground  
                                transition duration-200 hover:ease-in pl-1'
                            >
                                Find Group
                            </a>
                        </li>
                        <li>
                            <a
                                href="/create-post" 
                                onClick={closeMenu}
                                className='hover:text-onBackground/80 text-onBackground  
                                transition duration-200 hover:ease-in pl-1'
                            >
                                Create Post
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile" 
                                onClick={closeMenu}
                                className='hover:text-onBackground/80 text-onBackground  
                                transition duration-200 hover:ease-in pl-1'
                            >
                                Profile
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}