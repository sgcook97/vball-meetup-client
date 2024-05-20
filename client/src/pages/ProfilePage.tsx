import ProfileCard from '../components/ProfileCard'

export default function ProfilePage() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center mt-[3rem] md:mt-0'>
      <div className='flex flex-col justify-center items-center min-w-[20rem] w-[60%]
        max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[20rem]
        border-2 border-onBackground/10'
      >
        <ProfileCard />
      </div>
    </div>
    
  )
}
