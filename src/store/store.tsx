import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
//import { financeSlice,recipeSlice,parametersSlice,productSlice } from "./slices";


export const store=configureStore({
    reducer: {
        //[apiBuilder.reducerPath]: apiBuilder.reducer,
        //[demoBuilder.reducerPath] : demoBuilder.reducer
        
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);