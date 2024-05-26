import { useEffect, useRef, useState } from "react";
import getUser from "../services/get-user";
import { formatTimeSincePosted } from "../services/time-diff";
import { FaRegTrashCan } from "react-icons/fa6";

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
}

export default function PostCard({ post, profilePosts, onDelete } : PostPropsType) {
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const timeSincePost = formatTimeSincePosted(new Date(post.createdAt));
    const userId = getUser()?.userId;

    useEffect(() => {
      let handler = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setShowDeleteMenu(false)
        }
      }
      document.addEventListener('mousedown', handler);
    
      return () => {
        document.removeEventListener('mousedown', handler);
      }
    })
    

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
                <p className="text-sm text-secondary font-semibold">{post.poster.username}</p>
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
                    <div ref={menuRef} onClick={() => setShowDeleteMenu(!showDeleteMenu)}>
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