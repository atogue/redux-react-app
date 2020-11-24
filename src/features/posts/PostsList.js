import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { postDeleted } from './postsSlice'
import { Link}  from 'react-router-dom'
import {PostAuthor} from "./PostAuthor";
import {TimeAgo} from "./TimeAgo";

export const PostsList = () => {
    const posts = useSelector(state => state.posts)

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
    //Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <TimeAgo timestamp={post.date} />
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <button className="post-deleted"
                type="button"
                onClick={(e) => onDeletePostClicked(e, post.id)}>delete post</button>

            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>

            <PostAuthor userId={post.user} />
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}