import { Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile';
import { IoIosArrowRoundBack } from "react-icons/io";

export default function EditProfilePage() {
  return (
    <div className='h-screen w-screen flex flex-col
        justify-center items-center pt-[5rem]'>
        <div className='flex text-onBackground min-w-[20rem] w-[60%]
            max-w-[30rem]'>
          <Link to="/profile" className='flex justify-center items-center'><IoIosArrowRoundBack size={26}/>Back</Link>
        </div>
        <div className='flex flex-col justify-center items-center min-w-[20rem] w-[60%]
            max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[30rem]
            border-2 border-onBackground/10'
        >
          <EditProfile />
        </div>
    </div>
  )
}
