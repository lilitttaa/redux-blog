import React from 'react'
import { IPostItem, reactionAdded } from './postsSlice'
import { useAppDispatch } from '../../app/hooks'
const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionButtons = ({ post }: { post: IPostItem }) => {
    const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
        <button key={name} type="button" className="muted-button reaction-button"
            onClick={() => dispatch(reactionAdded(post.id, name))}
        >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}