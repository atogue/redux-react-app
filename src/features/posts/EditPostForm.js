import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated, selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'

export const EditPostForm = ({ match }) => {
    const { postId } = match.params
    const post = useSelector(state => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavedPostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({id:postId, title, content}))
            history.push(`/posts/${postId}`) // back to its single post view/page
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <PostAuthor userId={post.user} />

            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged} />
            </form>
            <button type="button" onClick={onSavedPostClicked}>
                Save Post
            </button>
        </section>
    )
}