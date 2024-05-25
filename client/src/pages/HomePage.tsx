// import WeatherDisplay from "../components/WeatherDisplay";
import WeatherSkeleton from "../components/WeatherSkeleton";

export default function HomePage() {
  return (
    <div className='text-onBackground relative pt-[5rem] 
    flex flex-col justify-center items-center'>
        <div className="max-w-[40rem] min-w-[20rem] w-[60%] 
          flex flex-col justify-center items-center"
        >
          <WeatherSkeleton />
        </div> 
        <div className='h-[30rem]'>
          <p>another div</p>
        </div>
        <div className='h-[30rem]'>
          <p>more content</p>
        </div>
    </div>
  )
}
