import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";
import { IUser, UserResponse } from "../types/dataTypes";

export const apiAuthService = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/admin",
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchIsTokenValid: build.query<string, void>({
      query: () => ({
        url: "",
      }),
    }),

    fetchLoginUser: build.mutation<UserResponse, IUser>({
      query: (payload) => {
        return {
          method: "post",
          url: "sign-in",
          body: payload,
        };
      },
    }),
  }),
});
export {};
