import React, { useContext, useState } from 'react';
import getUser from '../services/get-user';
import { skillLevels } from '../lib/data';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../services/AuthContext';
import ChangePassword from './ChangePassword';
import useApi from '../config/axiosConfig';

export default function EditProfile() {
    const [newSkillLevel, setNewSkillLevel] = useState<string | undefined>('');
    const authContext = useContext(AuthContext);
    let user = authContext?.currentUser;
    const api = useApi();

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();
        try {
            const userId = getUser();
            await api.put(`/user/${userId}/skill-level`, {
                    skillLevel: newSkillLevel,
                },
            );
            if (user) {
                user.skillLevel = newSkillLevel as string;
            }
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Skill level updated successfully!');
        } catch (error) {
            console.error('Error updating skill level:', error);
            toast.error('Failed to update skill level');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center gap-y-8 w-full h-full'>
            <h2 className='font-semibold text-[28px]'>Edit Profile</h2>
            <label className='flex justify-between w-[80%] gap-4'>
                <p className='text-lg font-semibold'>Change Skill Level:</p> 
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-end'>
                    <select
                        className='text-onSurface focus:outline-none 
                        bg-onSurface/10 border-2 border-onSurface/30 
                        rounded-md py-1 px-2 focus:border-secondary'
                        value={newSkillLevel}
                        onChange={e => setNewSkillLevel(e.target.value)}
                    >
                        {skillLevels.map((level, index) => (
                            <option key={index} value={level}>{level}</option>
                        ))}
                    </select>
                    <button className={`bg-onSurface/40 w-[5rem] rounded-md 
                    py-2 px-3 ml-4 transition ${newSkillLevel === '' ? '' : 'hover:bg-primary'}`}
                        type='submit'
                        disabled={newSkillLevel === '' ? true : false}
                    >
                        Submit
                    </button>
                </form>
            </label>
            <ChangePassword />
            <ToastContainer />
        </div>
    )
}
