import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "SUCCESS" | "ERROR" | "WARNING" | "INFO"

export type FloatingNotificationBarState = {
  notification?: {
    message: string;
    type: AlertType;
  }
}

export const initialState: FloatingNotificationBarState = {
  notification: undefined
}

export const floatingNotificationBarSlice = createSlice({
  name: "floatingNotificationBar",
  initialState,
  reducers: {
    displayFloatingNotificationBar: (state, action: PayloadAction<FloatingNotificationBarState>) => {
      state.notification = action.payload.notification;
    },
    hiddenFloatingNotificationBar: (state) => {
      state.notification = undefined;
    }
  }
})

export const { displayFloatingNotificationBar, hiddenFloatingNotificationBar } = floatingNotificationBarSlice.actions;

export default floatingNotificationBarSlice.reducer;
