import { configureStore } from '@reduxjs/toolkit'

// - reducer ===========================================================================================================
import floatingNotificationBarReducer from "../src/features/floatingNotificationBar/floatingNotificationBarSlice";


export const store = configureStore({
  reducer: {
    floatingNotificationBar: floatingNotificationBarReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
