import {combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/user/userSlice";
import { undoable } from "./undoable";

const rootReducer = undoable(combineReducers({
    posts: postsReducer,
    users: usersReducer,
}));

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


