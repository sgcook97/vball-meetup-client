import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard'
import useApi from '../config/axiosConfig';
import PostCard from '../components/PostCard';
import getUser from '../services/get-user';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';

interface PostType {
  postId: string,
  title: string;
  location: string;
  skillLevel: string;
  content: string;
  poster: {
    posterId: string,
    username: string;
  };
  createdAt: Date,
}

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const userId = getUser()?.userId;

  const fetchUserPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/post/${userId}`, {
        params: { page, limit: 10 },
      });

      const transformedPosts = response.data.posts.map((post: any) => ({
        ...post,
        postId: post._id,
      }));
      setUserPosts(transformedPosts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserPosts(currentPage);
  }, [currentPage, api]); 

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeletePost = async (postId: string, posterId: string, userId: string) => {
    try {
      await api.delete(`/post/${postId}`, {
        data: { posterId, userId }
      });
      setUserPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
      toast.success('Post deleted successfully.')
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='w-full flex flex-col justify-center items-center pt-[5rem]'>
      <div className='flex flex-col justify-center items-center min-w-[20rem] w-[60%]
        max-w-[30rem] bg-onSurface/5 text-onSurface rounded-md h-[15rem]
        border-2 border-onBackground/10 mb-5'
      >
        <ProfileCard />
      </div>
      {userPosts.length > 0 ? 
        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='my-3 text-[28px] font-semibold text-onBackground'>Your Posts</h1>
          <div className={`${loading ? 'loading' : ''} flex flex-col w-full items-center`}>
            {loading ? (
              <div className="loader">Loading...</div> // Loading indicator
            ) : (
              userPosts.map((post, index) => (
                <div className='min-w-[320px] w-[60%] max-w-[30rem]' key={index}>
                  <PostCard profilePosts={true} post={post} onDelete={handleDeletePost} />
                </div>
              ))
            )}
          </div>
          <div className='flex justify-center items-center w-[20rem] mt-4'>
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
              className={`bg-onBackground/20 text-onBackground rounded-md px-1
              ${currentPage === 1 ? 'opacity-50' : 'hover:bg-primary'} transition`}
            >
              <IoIosArrowRoundBack size={26}/>
            </button>
            <span className="mx-2 text-onBackground">{currentPage} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className={`bg-onBackground/20 text-onBackground rounded-md px-1
              ${currentPage === totalPages ? 'opacity-50' : 'hover:bg-secondary'} transition`}
            >
              <IoIosArrowRoundForward size={26}/>
            </button>
          </div>
        </div> 
        :
        <></>
      }
      <ToastContainer />
    </div>
  )
}
