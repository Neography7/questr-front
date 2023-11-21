import { createSlice } from '@reduxjs/toolkit'

// UserState Interface
export interface UserState {
    authenticated: boolean;
    token: string | null;
    user: {
        id: string;
        username: string;
        nickname: string;
        email: string;
        avatar: string;
    } | {};
}

// Initial State
const initialState: UserState = {
    authenticated: false,
    token: null,
    user: {}
}
  
// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.authenticated = action.payload.authenticated;
            state.token = action.payload.token;
            state.user = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                nickname: action.payload.user.nickname,
                email: action.payload.user.email,
                avatar: action.payload.user.avatar
            }
        },
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = {
                id: action.payload.user.id,
                username: action.payload.user.username,
                nickname: action.payload.user.nickname,
                email: action.payload.user.email,
                avatar: action.payload.user.avatar
            }
        },
        setAvatar: (state, action) => {
            state.user = {
                ...state.user,
                avatar: action.payload,
            }
        },
        setInformation: (state, action) => {
            const { username, nickname, email } = action.payload
            state.user = {
                ...state.user,
                username: username,
                nickname: nickname,
                email: email,
            }
        },
        setLogout: (state) => {
            state.authenticated = false;
            state.token = null;
            state.user = {};
        },
    },
});

export const { setAuthenticated, setAuth, setUser, setToken, setLogout, setAvatar, setInformation } = authSlice.actions;

export default authSlice.reducer