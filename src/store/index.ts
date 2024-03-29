import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { emptySplitApi } from "./services/emptySplitApi";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  }).concat(emptySplitApi.middleware),

})

export const persistor = persistStore(store)
