import { useEffect, useRef, useState } from "react";
import useApi from "../config/axiosConfig";
import PostCard from "../components/PostCard";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ChatModal from "../components/ChatModal";

interface SelectedUser {
  userId: string;
  username: string;
}

export default function FindGroupPage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const chatModalRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (chatModalRef.current && !chatModalRef.current.contains(e.target as Node)) {
        setShowChatModal(false);
      }
    }
    document.addEventListener('mousedown', handler);
  
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  })


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
            <div className="min-w-[320px] w-[60%] max-w-[30rem]" key={index}>
              <PostCard profilePosts={false} post={post}
                setShowChatModal={setShowChatModal} 
                setSelectedUser={setSelectedUser}
              />
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
      {showChatModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
          <div className="absolute inset-0 bg-background opacity-75"></div>
          <div className="relative rounded-lg bg-surface max-w-[30rem] min-w-[20rem] w-full">
            <div ref={chatModalRef}>
              <ChatModal selectedUser={selectedUser} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
