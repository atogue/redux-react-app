import {createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {id: '1', title: 'First Post!', content: 'Hello React Redux community!'},
    {id: '2', title: 'Second Post!', content: `I'm a new React dev and thanks for warm welcome wishes!!!`}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
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

export const { postAdded, postDeleted, postUpdated } = postsSlice.actions

export default postsSlice.reducer