import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {id: '1', title: 'First Post!', content: 'Hello React Redux community!'},
    {id: '2', title: 'Second Post!', content: `I'm a new React dev and thanks for warm welcome wishes!!!`}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        },
        deletePost(state, action) {
            let index = null
            state.filter(post => {
                if (post.id === action.payload.id) {
                    index = state.indexOf(post)
                }
            })

            if (index > -1) {
               // console.log('post found with index (' + index + ') and deleted from state!')
                state.splice(index, 1)
            }
        }
    }
})

export const { postAdded, deletePost } = postsSlice.actions

export default postsSlice.reducer