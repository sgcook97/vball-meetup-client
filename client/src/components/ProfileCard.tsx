import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import { Link } from 'react-router-dom';

export default function ProfileCard() {
    const authContext = useContext(AuthContext);
    const user = authContext?.currentUser;

    return (
        <div className='flex flex-col justify-center min-w-[18rem] w-[80%] h-full'>
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
                    {user?.favoritePlaces?.length === 0 ?  
                        <></>
                        : 
                        <div className='flex justify-between w-full'>
                            <p className='text-primary font-semibold'>
                                Favorite Locations:
                            </p>
                            {user?.favoritePlaces?.map((place, index) => (
                                <p key={index}>{place}</p>
                            ))}
                        </div>
                    }
                </div> 
            </div>
            <div className='mt-4 flex justify-center items-center'>
                <Link className='bg-onSurface/30 text-center rounded-md
                    px-3 py-1 hover:bg-primary transition hover:text-onPrimary' 
                    to="/edit-profile"
                >
                    Edit Profile
                </Link>
            </div>
            
        </div>
    )
}
