import React, { useEffect, useState } from 'react';
import getUser from '../services/get-user';
import axios from 'axios';
import authHeader from '../services/auth-header';

interface User {
    userId: string;
    username: string;
    email: string;
    skillLevel: string;
    favoriteLocations: Array<string> | null;
}

export default function ProfileCard() {
    const [user, setUser] = useState<User | null>(null);
    const userId = getUser();
    const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BLOCKPARTY_API_URL}/user/${userId}`,
                {
                  headers: authHeader(),
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <div className='flex flex-col justify-center w-[60%] h-full'>
            <h2 className='text-center font-semibold text-[28px] mb-10'>
                Your Profile
            </h2>
            <div>
                <div className='flex justify-between w-full'>
                    <p className='text-primary font-semibold'>Username:</p>
                    <p>{user?.username}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-primary font-semibold'>Email:</p>
                    <p>{user?.email}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p className='text-primary font-semibold'>Skill Level:</p>
                    <p>{user?.skillLevel}</p>
                </div>
                <div className='flex justify-between w-full'>
                    {user?.favoriteLocations ?  
                        <div className='flex justify-between w-full'>
                            <p className='text-primary font-semibold'>
                                Favorite Locations:
                            </p>
                            {user?.favoriteLocations?.map((location, index) => (
                                <p key={index}>{location}</p>
                            ))}
                        </div>
                        : <></>
                    }
                </div> 
            </div>
            <div className='mt-4 flex justify-center items-center'>
                <a className='bg-onSurface/40 text-center rounded-md
                    px-3 py-1' 
                    href="/edit-profile"
                >
                    Edit Profile
                </a>
            </div>
            
        </div>
    )
}
