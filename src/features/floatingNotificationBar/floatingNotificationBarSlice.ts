import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "SUCCESS" | "ERROR" | "WARNING" | "INFO"

export type FloatingNotificationBarState = {
  isDisplay: boolean;
  message: string;
  type: AlertType;
}

export const initialState: FloatingNotificationBarState = {
  isDisplay: false,
  message: "",
  type: "ERROR"
}

export const floatingNotificationBarSlice = createSlice({
  name: "floatingNotificationBar",
  initialState,
  reducers: {
    displayFloatingNotificationBar: (state, action: PayloadAction<FloatingNotificationBarState>) => {
      state.isDisplay = action.payload.isDisplay;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hiddenFloatingNotificationBar: (state) => {
      state.isDisplay = false;
    }
  }
})

export const { displayFloatingNotificationBar, hiddenFloatingNotificationBar } = floatingNotificationBarSlice.actions;

export default floatingNotificationBarSlice.reducer;
