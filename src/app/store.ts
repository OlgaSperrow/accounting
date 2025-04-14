import {configureStore} from "@reduxjs/toolkit";
import user from '../features/user/userSlice.ts'
import token from '../features/token/tokenSlice.ts'

export const store =configureStore({
    reducer: {
        user, token
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch