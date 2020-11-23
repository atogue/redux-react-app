import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from './postsSlice'
import { Link}  from 'react-router-dom'

export const PostsList = () => {
    const posts = useSelector(state => state.posts)

    const dispatch = useDispatch()
    const onDeletePostClicked = (e, id) => {
        e.preventDefault()
        if (id) {
            dispatch(
                deletePost({
                    id: id
                })
            )
        }
    }

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <button className="delete-post"
                type="button"
                onClick={(e) => onDeletePostClicked(e, post.id)}>delete post</button>
            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}