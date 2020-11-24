import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello React Redux community!',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    },
    {
        id: '2',
        title: 'Second Post!',
        content: `I'm a new React dev and thanks for warm welcome wishes!!!`,
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction] = existingPost.reactions[reaction] +1
            }
        },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
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
            state.filter(post => {
                if (post.id === action.payload.id) {
                    index = state.indexOf(post)
                }
            })

            if (index > -1) {
               // console.log('post found with index (' + index + ') and deleted from state!')
                state.splice(index, 1)
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postDeleted, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer