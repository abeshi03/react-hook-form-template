import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  uid: string;
  name?: string;
  email: string;
}

const initialState: User = {
  uid: "",
  name: "",
  email: ""
}


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (user) => {
      user.uid = "";
      user.name = "";
      user.email = "";
    },
    updateUser: (user, action: PayloadAction<User>) => {
      user.uid = action.payload.uid;
      user.name = action.payload.name;
      user.email = action.payload.email;
    }
  }
})

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
