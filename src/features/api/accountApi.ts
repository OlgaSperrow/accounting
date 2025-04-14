import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {base_url, createToken} from "../../utils/constants.ts";
import {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {

      const response = await fetch(`${base_url}/account/user`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        console.log(response.status);
        if (response.status ===409)
        {
            throw new Error (`user ${user.login} allready exists`)
        }

        if(!response.ok){
            throw new Error (`Something went wrong`)
        }
        const data = await response.json()
        const token = createToken(user.login, user.password)
        return {user: data, //это попадает в action.payload.user
            token}  //а это попадает в action.payload.token


        /*
       возвращает:
       {
           user: { login, firstName, lastName, roles }, // тип: UserProfile
           token: "Basic base64EncodedToken"            // тот же, что передавался
       }

       Это попадет в action.payload

       {
           user: {
               login: "johndoe",
               firstName: "John",
                lastName: "Doe",
               roles: ["user"]
               },
               token: "Basic am9obmRvZTpwYXNz"
               }
        */

    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/account/login`,{
            method: 'POST',
            headers:{
                Authorization: token
            }
        })

        if (response.status === 401){
            throw new Error (`login or passwor incorrect`)
        }

        if(!response.ok){
            throw new Error (`Something went wrong`)
        }
        const data = await response.json();
        return {user: data, //это попадает в action.payload.user
            token}   //а это попадает в action.payload.token
        /*
        возвращает:
        {
            user: { login, firstName, lastName, roles }, // тип: UserProfile
            token: "Basic base64EncodedToken"            // тот же, что передавался
        }

        Это попадет в action.payload

        {
            user: {
                login: "johndoe",
                firstName: "John",
                 lastName: "Doe",
                roles: ["user"]
                },
                token: "Basic am9obmRvZTpwYXNz"
                }
         */
    }

)

export const updateUser = createAsyncThunk<UserProfile, UserData, {state: RootState}> (
    'user/update',
    async (user, {getState}) => {
        const response = await fetch(`${base_url}/account/user`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token
            }
        })
        if (response.status === 401){
            throw new Error (`login or passwor incorrect`)
        }

        if(!response.ok){
            throw new Error (`Something went wrong`)
        }
       return await response.json(); // action.payload возвращает объект полбзователя из ответа скрвера после обновления
/*
вот пример возврата
{
  login: "johndoe",
  firstName: "John",
  lastName: "Doe",
  roles: ["user"]
}
 */
    }
    )


export const changePassword = createAsyncThunk<string,{newPassword: string, oldPassword: string}, {state: RootState}>(
    'user/password',
    async ({newPassword, oldPassword}, {getState}) => {
        const response = await fetch(`${base_url}/account/user/password`, {
            method: 'PUT',
            headers:{
                "X-Password": newPassword,
                Authorization: createToken(getState().user.login, oldPassword)

            }
        })
        if (response.status === 401){
            throw new Error (`login or passwor incorrect`)
        }

        if(!response.ok){
            throw new Error (`Something went wrong`)
        }

        return createToken(getState().user.login, newPassword); // action.payload
        // возвращает новый токен после авторизации в виде строки Пример "Basic am9obmRvZTpuZXdQYXNz"

        })