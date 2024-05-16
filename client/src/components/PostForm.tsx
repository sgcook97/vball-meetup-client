import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');

  const BLOCKPARTY_API_URL : string = import.meta.env.VITE_BLOCKPARTY_API_URL as string;

  const handlePost = async () => {
    try {
      const response = await axios.post<{ id: string }>(`${BLOCKPARTY_API_URL}/post`, {
        title,
        location,
        content,
      });

      console.log('Post created:', response.data);

      setTitle('');
      setLocation('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='m-2 flex flex-col items-center justify-center max-w-[25rem] min-w-[15rem] w-[80%]'>
      <form action="" className='flex flex-col items-center 
        justify-center gap-2 w-full'
        onSubmit={(e) => {
          e.preventDefault();
          handlePost();
        }}
      >
        <input className='rounded-md w-full bg-onBackground/[0.01]
          border-2 border-onBackground/10 pl-1 py-1' 
          type="text" 
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input className='rounded-md w-full bg-onBackground/[0.01]
          border-2 border-onBackground/10 pl-1 py-1' 
          type="text" 
          placeholder='Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea className='rounded-md w-full h-[10rem] pl-1 py-1 
          bg-onBackground/[0.01] border-2 border-onBackground/10' 
          placeholder='Write something...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className='bg-primary text-onPrimary w-[5rem] h-[2.2rem]
          rounded-md hover:bg-secondary hover:text-onSecondary transition 
          duration-200'
          type='submit'
        >
            Post
        </button>
      </form>
    </div>
  )
}
