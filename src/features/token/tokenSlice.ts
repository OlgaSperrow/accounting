import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changePassword, fetchUser, registerUser} from "../api/accountApi.ts";

const initialState = ''

const tokenSlice = createSlice({
        name: "token",
        initialState: '',
        reducers: {
            setToken: (_state: string, action: PayloadAction<string>) => action.payload,
            deleteToken: () => initialState
        },
        extraReducers: builder => {
            builder
                .addCase(registerUser.fulfilled, (_state, action) => action.payload.token)
                .addCase(fetchUser.fulfilled, (_state, action) => action.payload.token)
                .addCase(changePassword.fulfilled, (_state, action) => action.payload)
        }
    }
)

export const {setToken, deleteToken} = tokenSlice.actions;
export default tokenSlice.reducer;