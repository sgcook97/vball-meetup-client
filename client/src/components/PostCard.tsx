import { useEffect, useRef, useState } from "react";
import getUser from "../services/get-user";
import { formatTimeSincePosted } from "../services/time-diff";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface PostPropsType {
    post: {
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
    };
    profilePosts: boolean;
    onDelete?: (postId: string, posterId: string, userId: string) => void;
    currentUserId?: string;
    setShowChatModal?: (show: boolean) => void;
    setSelectedUser?: (user: any) => void;
}

export default function PostCard({ post, profilePosts, onDelete, currentUserId, setShowChatModal, setSelectedUser } : PostPropsType) {
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const deleteMenuRef = useRef<HTMLDivElement | null>(null);
    const userMenuRef = useRef<HTMLDivElement | null>(null);

    const navigator = useNavigate();

    const timeSincePost = formatTimeSincePosted(new Date(post.createdAt));
    const userId = getUser()?.userId;

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if (deleteMenuRef.current && !deleteMenuRef.current.contains(e.target as Node)) {
                setShowDeleteMenu(false);
            }
        }
        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })
    
    useEffect(() => {
        let handler = (e: MouseEvent) => {
          if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
              setShowUserMenu(false);
          }
        }
        document.addEventListener('mousedown', handler);
      
        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    const handleMessage = () => {
        if (currentUserId !== '' && setShowChatModal) {
            setShowChatModal(true);
            setSelectedUser && setSelectedUser({ 
                userId: post.poster.posterId, 
                username: post.poster.username,
            });
        } else {
            navigator('/login');
        }
    }

    const handleDelete = async () => {
        if (onDelete) {
            setDeleting(true);
            await onDelete(post.postId, post.poster.posterId, userId as string);
            setDeleting(false);
            setShowDeleteMenu(false);
        }
    };

    return (
        <div className="w-full my-[1rem] bg-onSurface/5 text-onSurface py-[0.25rem] 
        px-[0.5rem] rounded-md border-2 border-onBackground/10 hover:border-secondary 
        transition hover:scale-[1.05]" >
            <div className="flex justify-between items-center">
                <h2 className="text-primary font-semibold text-xl">{post.title}</h2>
                <div className="relative"
                    ref={userMenuRef}
                    onClick={() => setShowUserMenu(!showUserMenu)} 
                >
                    <p className="text-sm hover:cursor-pointer text-secondary font-semibold">
                        {post.poster.username}
                    </p>
                    {showUserMenu &&
                        <div className="absolute top-6 right-0 w-fit flex flex-col 
                        text-onSurface bg-surface hover:bg-secondary hover:text-onSecondary 
                        rounded-lg transition">
                            <button className="w-full rounded-lg bg-onSurface/20 py-[2px] px-1"
                                onClick={handleMessage}
                            >
                                Message
                            </button>
                        </div>   
                    }
                </div>
            </div>
            <div className="-mt-[3px] flex items-center justify-between">
                <p className="text-xs font-thin">{timeSincePost}</p>
                <p className="text-xs font-thin">{post.skillLevel}</p>
            </div>
            <div className="mt-6 mb-5">
                <p>{post.content}</p>
            </div>
            <div className="flex justify-between items-center font-thin text-xs relative">
                <p>{post.location}</p>
                {profilePosts ? 
                    <div ref={deleteMenuRef} onClick={() => setShowDeleteMenu(!showDeleteMenu)}>
                        <FaRegTrashCan className="hover:cursor-pointer" size={12}/>
                        {showDeleteMenu && (
                            <div className="absolute bottom-5 right-0 flex flex-col bg-onSurface/10 w-[3rem] py-[2px] rounded-sm">
                                <button className="text-error w-full hover:bg-error hover:text-onError 
                                    rounded-t-sm opacity-80 hover:opacity-100 transition" 
                                    onClick={handleDelete} 
                                    disabled={deleting}
                                >
                                    Delete
                                </button>
                                <button className="hover:bg-secondary/60 transition rounded-b-sm" onClick={() => setShowDeleteMenu(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div> 
                    :
                    <></>
                }
            </div>
            
        </div>
    );
};