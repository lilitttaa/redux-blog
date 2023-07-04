import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ReactionButtons } from "./InteractiveButton";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { fetchPosts, selectAllPosts, selectPostsStatus, selectPostsError, IPostItem } from "./postsSlice";
import { useEffect } from "react";
import { Spinner } from "../../components/Spinner";

const PostExcerpt = ({ post }: { post: IPostItem }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const posts = useAppSelector(selectAllPosts);
    const postsStaus = useAppSelector(selectPostsStatus);
    const postsError = useAppSelector(selectPostsError);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (postsStaus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStaus,dispatch]);

    console.log(postsStaus)
    let content
    if (postsStaus === 'loading') {
        content = <Spinner text="Loading..." />
    } else if (postsStaus === 'succeeded') {
        // Sort posts in reverse chronological order by datetime string
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ))
    } else if (postsStaus === 'failed') {
        content = <div>{postsError}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    );
};