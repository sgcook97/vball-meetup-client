import React, { useEffect, useRef, useState } from 'react'
import useApi from '../config/axiosConfig';
import PostCard from './PostCard';
import ChatModal from './ChatModal';

interface SelectedUser {
    userId: string;
    username: string;
}

export default function HomePostDisplay() {
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const api = useApi();

    const [showChatModal, setShowChatModal] = useState(false);

    const chatModalRef = useRef<HTMLDivElement | null>(null);

    const fetchRecentPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await api.get(`/post/recent`, {
                params: { page, limit: 5 },
            });
            const transformedPosts = response.data.posts.map((post: any) => ({
                ...post,
                postId: post._id,
            }));
            setRecentPosts(transformedPosts);
        } catch (error) {
            console.error('Error fetching recent posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecentPosts(1);
    }, [api]);

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

    return (
        <div className='text-onBackground w-full
        flex flex-col justify-center items-center'>
            <div className={`${loading ? 'loading' : ''} flex flex-col w-full items-center`}>
                {loading ? (
                    <div className="loader">Loading...</div> // Loading indicator
                ) : (
                    recentPosts.map((post, index) => (
                        <React.Fragment key={index}>
                            <PostCard profilePosts={false} 
                                post={post}
                                setShowChatModal={setShowChatModal} 
                                setSelectedUser={setSelectedUser}
                            />
                        </React.Fragment>
                    ))
                )}
            </div>
            <a href="/find-group" 
                className='text-onPrimary bg-primary hover:bg-secondary
                hover:text-onSecondary transition duration-200 rounded-lg px-4 py-2 mt-4'
            >
                See more
            </a>
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
