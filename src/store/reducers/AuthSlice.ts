import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IState {
  admin: boolean;
  token: string | undefined;
}

const initialState: IState = {
  admin: false,
  token: Cookies.get("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.admin = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
