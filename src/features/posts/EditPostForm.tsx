import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { postsUpdated, selectPostById } from "./postsSlice"
import { useNavigate, useParams } from "react-router-dom"

export const EditPostForm = () => {
    const { postId } = useParams();
    const post = useAppSelector(state =>selectPostById(state, postId ? postId : ''));
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onSavePostClicked = () => {
        if (postId && title && content) {
            dispatch(postsUpdated(postId, title, content));
            navigate(`/posts/${postId}`);
        }
    }

    return (
        <section>
            <h2>编辑文章</h2>
            <form>
                <label htmlFor="postTitle">文章标题：</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">内容：</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                保存文章
            </button>
        </section>
    )
}