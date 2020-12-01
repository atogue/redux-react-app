import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

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
            return initialState.concat(action.payload)
        }
    }
})

export default usersSlice.reducer