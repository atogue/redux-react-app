import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const usersAdapter = createEntityAdapter()
// warning: this initial users doesn't match to server post object - add new post with them will fail!
const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.users
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            // use of adapter api : action.payload is the inMemory users
            // rename user name for personnal usage - should be useless
            action.payload.map(user => {
                if (user.firstName === 'Cody')
                    user.name = 'Anicet Togue'
                if (user.firstName === 'Mathias')
                    user.name = 'Monica Belluccia'
                if (user.firstName === 'Darren')
                    user.name = 'Sharon Stonesa'
                return user
            })
            usersAdapter.setAll(state, action.payload)
        }
    }
})

export default usersSlice.reducer

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)