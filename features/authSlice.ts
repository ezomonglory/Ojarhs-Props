import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../helpers/api";
import { getUserToken, setUserToken } from "../helpers/auth";
import { loginApi, rejectValue } from "../redux/auth";
import { ApiResponse, LoadState, loginResponse, User } from "../Typing.d";
import * as jose from 'jose'
import { store } from "../store";
import { boolean } from "yup";

export type AuthState = {
    authenticated: boolean
    token: loginResponse
    status: LoadState
    appState: 'pending' | 'completed'
    message: string
    error: {
        [key: string]: string
    }
    user?: User
}

export type JWTCLAIMS = {
    aud: User
    id: string
    iss: string
    sub: 'access_token' | 'refresh_token'
    iat: number
    exp: number
}

const checkIsAuthenticatedAsync = async () => {
    try {
        const { data } = await Api().get<ApiResponse>("/user/user")
        const auth = {} as {
            authenticated: boolean
            token?: loginResponse
            user?: User
        }
        auth.authenticated = data.status === 'success'
        if (data.data !== undefined && data.data !== null) {
            auth.token = data.data as loginResponse
            console.log("TOKEN", data)
            var dec = jose.decodeJwt(auth.token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            setUserToken(auth.token)
        } else {
            var token = getUserToken()
            if (token === undefined) {
                console.log("NO AUHT", token)
                store.dispatch(setAuthenticated({ authenticated: false }))
                return
            }
            var dec = jose.decodeJwt(token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            auth.token = token
        }
        console.log(auth)
        // if (auth.authenticated) setRefreshInterceptor()
        store.dispatch(setAuthenticated(auth))
    } catch (error) {
        store.dispatch(setAuthenticated({ authenticated: false }))
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        appState: 'completed'
    } as AuthState,
    reducers: {
        logout: (state) => { },
        setAppState: (state, { payload }: { payload: 'pending' | 'completed' }) => {
            state.appState = payload
        },
        setAuthenticated: (state, { payload }: {
            payload: {
                authenticated: boolean
                token?: loginResponse
                user?: User
            }
        }) => {
            console.log('SET AUTH CALLED')
            state.authenticated = payload.authenticated
            state.user = payload.user
            state.token = payload.token
            console.log("SET AUTH", payload)
            setTimeout(() => {
                store.dispatch(setAppState("completed"))
            }, 1500)
        },
        checkIsAuthenticated: (state) => {
            console.log('CHECK AUTH CALLED')
            state.appState = 'pending'
            if (getUserToken() === undefined) {
                state.appState = 'completed'
                state.authenticated = false
                state.user = undefined
                return
            }
            checkIsAuthenticatedAsync()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            if (payload.status === 'failed') {
                state.status = 'failed'
                state.message = payload.message
                state.error = payload.error
                return
            }

            setUserToken(payload.data)
            state.token = payload.data
            state.status = 'success'
            state.message = payload.message
            state.authenticated = true

            const dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User
        })

        builder.addCase(loginApi.pending, (state, { }) => {
            state.status = 'pending'
        })

        builder.addCase(loginApi.rejected, (state, { payload }: { payload }) => {
            state.status = 'failed'
            state.message = (payload as rejectValue).message
        })
    },
})

export const { logout, setAuthenticated, checkIsAuthenticated, setAppState } = authSlice.actions

export default authSlice.reducer