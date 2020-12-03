import React from 'react'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Link } from 'react-router-dom'
import { postDeleted } from './postsSlice'
import { useDispatch } from 'react-redux'

let SinglePostExcerpt = ({ post }) => {
    const dispatch = useDispatch()

    const onDeletePostClicked = (e, id) => {
        e.preventDefault()
        if (id) {
            dispatch(
                postDeleted({
                    id: id
                })
            )
        }
    }

    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <button className="post-deleted"
                    type="button"
                    onClick={(e) => onDeletePostClicked(e, post.id)}>delete post</button>

            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>

        </article>
    )
}

export const PostExcerpt = React.memo(SinglePostExcerpt)