import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {id: '0', name: 'Anicet Togue'},
    {id: '1', name: 'Muriel Togue'},
    {id: '2', name: 'Clara Togue'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer