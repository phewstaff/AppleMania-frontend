import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";
import { ICategory, IProduct } from "../types/dataTypes";
interface IBody {
  username: string;
  password: string;
}

export const apiStoreService = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    createProduct: build.mutation<IProduct, FormData>({
      query: (body) => ({
        method: "POST",
        url: "products",
        body,
      }),
    }),
    createCategory: build.mutation<ICategory, FormData>({
      query: (body) => ({
        method: "POST",
        url: "categories",
        body,
      }),
    }),
    deleteCategory: build.mutation<string, string>({
      query: (id) => ({
        method: "DELETE",
        url: `categories/${id}`,
      }),
    }),
    updateCategory: build.mutation<
      ICategory,
      { currentCategoryId: string; formData: FormData }
    >({
      query: ({ formData, currentCategoryId }) => ({
        method: "PATCH",
        url: `categories/${currentCategoryId}`,
        body: formData,
      }),
    }),
    fetchAllProducts: build.query<IProduct[], void>({
      query: () => ({
        url: "products",
      }),
    }),
    fetchCategories: build.query<ICategory[], void>({
      query: () => ({
        url: "categories",
      }),
    }),
    fetchProductsByCategoryId: build.query<IProduct[], string | undefined>({
      query: (id) => ({
        url: `products/category/${id}`,
      }),
    }),
    fetchProductById: build.query<IProduct[], string | undefined>({
      query: (id) => ({
        url: `products/${id}`,
      }),
    }),
  }),
});

export {};
