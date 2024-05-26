import { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        let handler = (e: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
              setIsOpen(false)
          }
        }
        document.addEventListener('mousedown', handler);
      
        return () => {
          document.removeEventListener('mousedown', handler);
        }
    })

    return (
        <div ref={menuRef}>
            <CiMenuBurger 
                size={25}
                className='text-onBackground hover:text-onBackground/80
                    transition duration-100 hover:ease-in hover:cursor-pointer' 
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
                        <li>
                            <a
                                href="/chat" 
                                onClick={closeMenu}
                                className='hover:text-onBackground/80 text-onBackground  
                                transition duration-200 hover:ease-in pl-1'
                            >
                                Chat
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}