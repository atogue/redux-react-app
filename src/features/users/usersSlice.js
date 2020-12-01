import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {id: '0', name: 'Anicet Togue'},
    {id: '1', name: 'Monica Belluccia'},
    {id: '2', name: 'Sharon Stonesa'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer