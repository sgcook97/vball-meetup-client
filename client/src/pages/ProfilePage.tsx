import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard'
import useApi from '../config/axiosConfig';
import PostCard from '../components/PostCard';
import React from 'react';
import getUser from '../services/get-user';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const api = useApi();
  const userId = getUser()?.userId;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await api.get(`/post/${userId}`);
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [api]); 

  return (
    <div className='w-screen flex flex-col justify-center items-center pt-[5rem]'>
      <div className='flex flex-col justify-center items-center min-w-[20rem] w-[60%]
        max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[15rem]
        border-2 border-onBackground/10 mb-5'
      >
        <ProfileCard />
      </div>
      <h1 className='my-3 text-[28px] font-semibold text-onBackground'>Your Posts</h1>
      <div className='flex flex-col w-full items-center'>
        {userPosts.map((post, index) => (
          <React.Fragment key={index}>
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
