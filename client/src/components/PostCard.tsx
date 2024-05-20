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
    };
}

export default function PostCard({ post } : PostPropsType) {
    return (
        <div className="w-full">
            <h2>Title: {post.title}</h2>
            <p>Location: {post.location}</p>
            <p>Skill Level: {post.skillLevel}</p>
            <p>Content: {post.content}</p>
            <p>Posted by: {post.poster.username}</p>
        </div>
    );
};