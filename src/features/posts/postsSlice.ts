import { PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { RootState } from "../../app/store";
import { addNewFakePost, fakePosts } from "../../api/fakeapi";

export interface IPostItem {
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions: { [key: string]: number };
};

interface IPostState {
    items: IPostItem[];
    status: 'idle' | 'loading' | 'failed' | 'succeeded';
    error: string | null;
}

const initialState: IPostState = {
    items: [],
    status: 'idle',
    error: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsAdded: {
            reducer(state, action: PayloadAction<{
                id: string, title: string, content: string, userId: string,
                date: string, reactions: { [key: string]: number },recordInHistory:boolean
            }>) {
                state.items.push(action.payload);
            },
            prepare(title: string, content: string, userId: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: sub(new Date(), { minutes: 10 }).toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        },
                        recordInHistory:true,
                    },
                    type: 'posts/postsAdded',
                }
            }
        },
        postsUpdated: {
            reducer: (state, action: PayloadAction<{ id: string, title: string, content: string }>) => {
                const { id, title, content } = action.payload;
                const existingPost = state.items.find(post => post.id === id);
                if (existingPost) {
                    existingPost.title = title;
                    existingPost.content = content;
                }
            },
            prepare(id: string, title: string, content: string) {
                return {
                    payload: {
                        id,
                        title,
                        content,
                        recordInHistory:true,
                    },
                    type: 'posts/postsUpdated',
                }
            }
        },
        reactionAdded: {
            reducer: (state, action: PayloadAction<{ postId: string, reaction: string }>) => {
                const { postId, reaction } = action.payload;
                const existingPost = state.items.find(post => post.id === postId);
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            },
            prepare(postId: string, reaction: string) {
                return {
                    payload: {
                        postId,
                        reaction,
                        recordInHistory:true,
                    },
                    type: 'posts/reactionAdded',
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = state.items.concat(action.payload);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ? action.error.message : 'Error';
        });
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    }
});


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fakePosts();
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async ({ title, content, userId }:
    { title: string, content: string, userId: string }) => {
    const response = await addNewFakePost(title, content, userId);
    return response.data;
})

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectPostById = (state: RootState, postId: string) => state.posts.items.find(post => post.id === postId);
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export const { postsAdded, postsUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;