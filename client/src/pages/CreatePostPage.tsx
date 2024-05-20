import PostForm from '../components/PostForm'

export default function CreatePostPage() {
  return (
    <div className='text-onBackground relative pt-[3.5rem] 
    flex flex-col justify-center items-center h-screen w-screen mt-[3rem] md:mt-0'>
      <h2 className='font-semibold text-onBackground text-3xl m-5'>Create Post</h2>
      <PostForm />
    </div>
  )
}
