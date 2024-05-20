import { formatTimeSincePosted } from "../services/time-diff";

interface PostPropsType {
    post: {
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
}

export default function PostCard({ post } : PostPropsType) {

    const timeSincePost = formatTimeSincePosted(new Date(post.createdAt));

    return (
        <div className="min-w-[20rem] w-[60%] max-w-[30rem] my-[1rem] bg-onSurface/10 text-onSurface py-[0.25rem] 
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
            <div className="flex justify-start font-thin text-xs">
                <p>{post.location}</p>
            </div>
            
        </div>
    );
};