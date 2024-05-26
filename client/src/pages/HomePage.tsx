// import WeatherDisplay from "../components/WeatherDisplay";
import { useContext } from "react";
import HomePostForm from "../components/HomePostForm";
import WeatherSkeleton from "../components/WeatherSkeleton";
import { AuthContext } from "../services/AuthContext";
import HomePostDisplay from "../components/HomePostDisplay";

export default function HomePage() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  return (
    <div className='text-onBackground relative pt-[5rem] 
    flex flex-col justify-center items-center'>
        <div className="max-w-[40rem] min-w-[20rem] w-[60%] 
          flex flex-col justify-center items-center"
        >
          <WeatherSkeleton />
        </div> 
        {currentUser && 
          <div className='mt-8 max-w-[40rem] min-w-[20rem] w-[60%]
            flex flex-col justify-center items-center'
          >
            <HomePostForm />
          </div>
        }
        
        <div className='mb-4 mt-4 max-w-[40rem] min-w-[20rem] w-[60%]
            flex flex-col justify-center items-center'>
          <HomePostDisplay />
        </div>
    </div>
  )
}
