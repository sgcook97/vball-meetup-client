import React, { useContext, useState } from 'react';
import { Select, Option } from '@material-tailwind/react';
import axios from 'axios';
import getUser from '../services/get-user';
import authHeader from '../services/auth-header';
import { skillLevels } from '../lib/data';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../services/AuthContext';

export default function EditProfile() {
    const [newSkillLevel, setNewSkillLevel] = useState<string | undefined>('');
    const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;
    const authContext = useContext(AuthContext);
    let user = authContext?.currentUser;

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();
        try {
            const userId = getUser();
            await axios.put(`${BLOCKPARTY_API_URL}/user/${userId}/skill-level`, {
                    skillLevel: newSkillLevel,
                },
                {
                    headers: authHeader(),
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
                Change Skill Level:
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-end'>
                    <Select label='Select Skill Level'
                        className='text-onSurface'
                        value={newSkillLevel}
                        error={newSkillLevel === '' ? true : false}
                        onChange={(e) => setNewSkillLevel(e)}
                        placeholder={undefined}
                        onPointerEnterCapture=''
                        onPointerLeaveCapture=''                   >
                        {skillLevels.map((level, index) => (
                            <Option key={index} value={level}>{level}</Option>
                        ))}
                    </Select>
                    <button className={`bg-onSurface/40 w-[5rem] rounded-md 
                    py-2 px-3 ml-4 transition ${newSkillLevel === '' ? '' : 'hover:bg-primary'}`}
                        type='submit'
                        disabled={newSkillLevel === '' ? true : false}
                    >
                        Submit
                    </button>
                </form>
            </label>
            <div className='flex justify-between'>
                <a href="/forgot-password"
                    className='bg-onSurface/40 rounded-md 
                    py-2 px-3 hover:bg-primary transition'
                >
                    Change Password
                </a>
            </div>
            <ToastContainer />
        </div>
    )
}
