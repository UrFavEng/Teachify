import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddToCartRequest,
  ApiResponseAddToCart,
  ApiResponseGetCartUser,
  CourseResponse,
  CreateOrderReq,
  dataProductsByCat,
  ProductById,
} from "./types";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://strapi-ecom-1-production.up.railway.app/api/",
    prepareHeaders(headers) {
      headers.set(
        "Authorization",
        `Bearer 8fd9a2e8758e83744cf2bfd98bd8931dfe99d9fc10d19db07360b0016cd56197f0f6429473ddd4255c1c5b0281f5a93b832ac4c4f64fdac009fcc9d040317c2bcfffc254a9068211c60860ea9e1c518405986e852f83e998f3917f569604c84a65cf3531ef6d552aac6a50cf52b64fa1fa38017dddf31de9c33346efd6c92291`
      );
      return headers;
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<CourseResponse, void>({
      query: () => `products?populate=*`,
    }),
    getProductById: builder.query<ProductById, { id: string | undefined }>({
      query: ({ id }) => `products/${id}?populate=*`,
    }),
    getAllProductsByCat: builder.query<
      dataProductsByCat,
      { cat: string | undefined }
    >({
      query: ({ cat }) => `products?filters[category][$eq]=${cat}&populate=*`,
    }),
    addToCart: builder.mutation<ApiResponseAddToCart, AddToCartRequest>({
      query: (body) => ({
        url: "carts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    getUserCart: builder.query<
      ApiResponseGetCartUser,
      { email: string | undefined }
    >({
      query: ({ email }) =>
        `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`,
      providesTags: ["cart"],
    }),
    deleteCart: builder.mutation<ApiResponseAddToCart, { id: string }>({
      query: ({ id }) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    createOrder: builder.mutation<void, CreateOrderReq>({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllProductsByCatQuery,
  useAddToCartMutation,
  useGetUserCartQuery,
  useDeleteCartMutation,
  useCreateOrderMutation,
} = apiSlice;
