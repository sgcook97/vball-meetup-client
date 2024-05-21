import WeatherDisplay from "../components/WeatherDisplay";

export default function HomePage() {
  return (
    <div className='text-onBackground relative pt-[5rem] 
    flex flex-col justify-center items-center'>
        <div>
          <WeatherDisplay />
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
