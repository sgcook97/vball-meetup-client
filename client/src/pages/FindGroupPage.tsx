import { useEffect, useState } from "react";
import useApi from "../config/axiosConfig";
import React from "react";
import PostCard from "../components/PostCard";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function FindGroupPage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const fetchRecentPosts = async (page: number) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await api.get(`/post/recent`, {
        params: { page, limit: 10 },
      });
      const transformedPosts = response.data.posts.map((post: any) => ({
        ...post,
        postId: post._id,
      }));
      setRecentPosts(transformedPosts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPosts(currentPage);
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

  return (
    <div className='text-onBackground pt-[5rem] 
    flex flex-col justify-center items-center'>
      <h1 className='mb-3 text-[28px] font-semibold text-onBackground'>Recent Posts</h1>
      <div className={`${loading ? 'loading' : ''} flex flex-col w-full items-center`}>
        {loading ? (
          <div className="loader">Loading...</div> // Loading indicator
        ) : (
          recentPosts.map((post, index) => (
            <React.Fragment key={index}>
              <PostCard profilePosts={false} post={post}/>
            </React.Fragment>
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
        <span className="mx-2">{currentPage} of {totalPages}</span>
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
  )
}
