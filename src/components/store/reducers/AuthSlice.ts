import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

interface IState {
  admin: boolean;
  token: string | undefined;
}

const initialState: IState = {
  admin: false,
  token: token,
};
if (token) {
  initialState.admin = true;
} else {
  initialState.admin = false;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
