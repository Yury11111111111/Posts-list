import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PostsSlice from '../slices/PostsSlice';

export const store = configureStore({
  reducer: {
    posts: PostsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
