import { useContext, useEffect, useRef, useState } from "react";
import PostForm from "./PostForm";
import { AuthContext } from "../services/AuthContext";

export default function HomePostForm() {
    const currentUser = useContext(AuthContext)?.currentUser;
    const [showPostForm, setShowPostForm] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);

    function handleClickForm() {
        setShowPostForm(!showPostForm);
    }

    useEffect(() => {
        let handler = (e: MouseEvent) => {
          if (formRef.current && !formRef.current.contains(e.target as Node)) {
              setShowPostForm(false)
          }
        }
        document.addEventListener('mousedown', handler);
      
        return () => {
          document.removeEventListener('mousedown', handler);
        }
    })

    return (
        <div className="py-4 bg-onSurface/5 text-onSurface flex w-full rounded-lg border-2 border-onSurface/10 justify-between items-center px-5">
            <a href="/profile" className="text-primary font-semibold text-lg">{currentUser?.username}</a>
            <div onClick={handleClickForm} className="bg-onSurface/15 w-[80%] py-1 px-2 ml-2 rounded-full hover:cursor-pointer">Post Something...</div>
            {showPostForm &&
                <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
                    <div className="absolute inset-0 bg-background opacity-75"></div>
                    <div className="relative rounded-lg bg-surface max-w-[30rem] min-w-[20rem] w-full">
                        <div ref={formRef} 
                            className="bg-onSurface/5 w-full h-full rounded-lg flex flex-col 
                            items-center justify-center py-4 shadow-xl border-2 border-onSurface/10">
                            <h2 className='font-semibold text-onBackground text-3xl m-5'>Create Post</h2>
                            <PostForm handleClickForm={handleClickForm} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
