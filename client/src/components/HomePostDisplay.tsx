import React, { useEffect, useState } from 'react'
import useApi from '../config/axiosConfig';
import PostCard from './PostCard';

export default function HomePostDisplay() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const api = useApi();

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

    return (
        <div className='text-onBackground w-full
        flex flex-col justify-center items-center'>
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
            <a href="/find-group" 
                className='text-onPrimary bg-primary hover:bg-secondary
                hover:text-onSecondary transition duration-200 rounded-lg px-4 py-2 mt-4'
            >
                See more
            </a>
        </div>
    )
}
