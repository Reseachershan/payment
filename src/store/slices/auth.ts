import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: [],
}

const initialState = {
    token: null,
    user: null,
    isNew: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsNew: (state, {payload}) => {
            state.isNew = payload;
        },
        loggedIn: (state, {payload: {token, user}}) => {
            state.token = token;
            if (user) {
                state.user = user;
            }
        },
        logout : (state) => {
            state.token = null;
            state.user = null;
        },
       
    },
})

export const { loggedIn, logout, setIsNew } = authSlice.actions

export const authReducer = persistReducer(persistConfig, authSlice.reducer)