import { configureStore } from '@reduxjs/toolkit'

// - reducer ===========================================================================================================
import floatingNotificationBarReducer from "../src/features/floatingNotificationBar/floatingNotificationBarSlice";
import userReducer from "../src/features/userSlice";
import authenticationReducer from "../src/features/authenticationSlice";


export const store = configureStore({
  reducer: {
    floatingNotificationBar: floatingNotificationBarReducer,
    user: userReducer,
    authentication: authenticationReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
