import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addNewPost } from "./postsSlice"

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    const onSavePostClicked = async () => {
        if (canSave) {
          try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({ title, content, userId: userId })).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
          } catch (err) {
            console.error('Failed to save the post: ', err)
          } finally {
            setAddRequestStatus('idle')
          }
        }
      }

    return (
        <section>
            <h2>添加新文章</h2>
            <form>
                <label htmlFor="postTitle">文章标题:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="postContent">内容：</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>保存文章</button>
            </form>
        </section>
    )
}