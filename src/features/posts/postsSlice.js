import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction] = existingPost.reactions[reaction] +1
            }
        },
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                    }
                }
            }
        },
        postDeleted(state, action) {
            let index = null
            // eslint-disable-next-line
            state.posts.filter(post => {
                if (post.id === action.payload.id) {
                    index = state.posts.indexOf(post)
                }
            })

            if (index > -1) {
               // console.log('post found with index (' + index + ') and deleted from state!')
                state.posts.splice(index, 1)
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postDeleted, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)