import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakeUsers } from "../../api/fakeapi";

interface userItem{
    id: string;
    name: string;
};

const initialState: userItem[] = [
    { id: '1', name: 'First User!' },
    { id: '2', name: 'Second User' },
];

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
    const response = await fakeUsers();
    return response.data;
});

export const selectUserById = (state: any, userId: string) => state.users.find((user: any) => user.id === userId);

export default usersSlice.reducer;