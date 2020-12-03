import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost',
    // payload creator receives the partial `{title, content, user}` object
    async initialPost => {
        // send the initial data to the fake API server
        const response = await client.post('/fakeApi/posts', { post: initialPost })
        // response includes the complete post object, including unique ID
        return response.post
    })

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
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            //add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.pending]: (state, action) => {
            state.status = 'in progress'
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // add directly the new post object to our posts array
            state.posts.push(action.payload)
        },
        [addNewPost.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
})

export const { postAdded, postDeleted, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

// memoized selector function to retrieve all posts by userId
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)