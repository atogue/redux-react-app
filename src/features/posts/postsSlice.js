import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

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
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction] = existingPost.reactions[reaction] +1
            }
        },
        postDeleted(state, action) {
            postsAdapter.removeOne(state, action.payload.id)
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.entities[id]
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
            // add any fetched posts to the array
            // Use the `upsertMany` reducer as a mutating update utility
            postsAdapter.upsertMany(state, action.payload)
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
            // Use the `addOne` reducer for the fulfilled case
            postsAdapter.addOne(state, action.payload)
        },
        [addNewPost.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
})

export const { postAdded, postDeleted, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

// memoized selector function to retrieve all posts by userId
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)