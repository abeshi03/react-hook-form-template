// - ライブラリー ========================================================================================================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type LoginState = {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false
}


export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<LoginState>) => {
      state.isLogin = action.payload.isLogin;
    }
  }
})

export const { setIsLogin } = authenticationSlice.actions;

export default authenticationSlice.reducer;
