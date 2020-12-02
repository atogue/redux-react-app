import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// warning: this initial users doesn't match to server post object - add new post with them will fail!
const initialState = [
    {id: '0', name: 'Anicet Togue'},
    {id: '1', name: 'Monica Belluccia'},
    {id: '2', name: 'Sharon Stonesa'}
]

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
            // action.payload is the inMemory users
            return action.payload ? action.payload.concat(initialState) : initialState
        }
    }
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)