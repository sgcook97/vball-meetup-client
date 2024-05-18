import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Select, Option } from '@material-tailwind/react';
import axios from 'axios';
import getUser from '../services/get-user';
import authHeader from '../services/auth-header';

const skillLevels = [
    'AA/Open',
    'A',
    'BB',
    'B',
    'C'
];

export default function EditProfile() {
    const [newSkillLevel, setNewSkillLevel] = useState<string | undefined>('');
    const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

    const handleSubmit = async () => {
        try {
            const userId = getUser();
            await axios.put(`${BLOCKPARTY_API_URL}/user/${userId}/skill-level`, {
                skillLevel: newSkillLevel,
            },
            {
                headers: authHeader(),
            },
        );
        } catch (error) {
            console.error('Error updating skill level:', error);
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
                    >
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
        </div>
    )
}
