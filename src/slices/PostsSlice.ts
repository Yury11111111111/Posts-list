import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Post {
  title?: string;
  body?: string;
}

interface Posts {
  posts: Post[];
  status: null | string;
  error: null | string;
}

const initialState: Posts = {
  posts: [],
  status: null,
  error: null,
};

export const fetchPosts: any = createAsyncThunk(
  "fetchPosts",
  async function (state) {
    var randomNumber: number = ~~(Math.random() * 15);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${randomNumber}`
    );

    const data = await response.json();

    return data;
  }
);

export const postsSlise = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.error = null;
      state.posts = [...state.posts, ...action.payload];
    },
    [fetchPosts.rejected]: (state) => {
      state.error = "error";
      console.log("Error");
    },
  },
  reducers: {
    addPost: (state, action: any) => {
      state.posts = [
        ...state.posts,
        {
          title: action.payload.title,
          body: action.payload.body,
        },
      ];
    },
    deletePost: (state, action: any) => {
      state.posts = [
        ...state.posts.slice(0, action.payload),
        ...state.posts.slice(action.payload + 1),
      ];
    },
  },
});

export const { addPost, deletePost } = postsSlise.actions;
export default postsSlise.reducer;
