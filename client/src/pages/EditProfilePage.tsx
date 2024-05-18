import React from 'react'
import EditProfile from '../components/EditProfile'

export default function EditProfilePage() {
  return (
    <div className='h-screen w-screen flex flex-col
        justify-center items-center'>
        <div className='flex flex-col justify-center items-center min-w-[20rem] w-[60%]
            max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[20rem]
            border-2 border-onBackground/10'
        >
            <EditProfile />
        </div>
    </div>
  )
}
