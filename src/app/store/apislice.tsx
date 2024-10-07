import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddToCartRequest,
  ApiResponseAddToCart,
  ApiResponseGetCartUser,
  CourseResponse,
  CreateOrderReq,
  CreateReviewReq,
  dataProductsByCat,
  getAllCat,
  ProductById,
} from "./types";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://strapi-ecom-1-production.up.railway.app/api/",
    // baseUrl: "http://localhost:1337/api/",
    prepareHeaders(headers) {
      headers.set(
        "Authorization",
        `Bearer a5d56bfa8fe46f31c13310a00272ff713ca1ea58896da0274e10aa9a02b80d38a095e890065f3a2bd9cab1b34f2baf4b570dd24bb04fe0fbfd4f3f891f3bdf8e6420c2f307ba2a9f1a3f04e247eb31891c5c010d2fca49d018af7b789797e11817129d384f3186c6c193c38f80d89ff4c315fcff373b06ec87b9afe51950ecba`
      );
      return headers;
    },
  }),
  tagTypes: ["cart", "review"],
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
    getAllCat: builder.query<getAllCat, void>({
      query: () => `products?fields=category`,
    }),
    searchProducts: builder.query({
      query: (title) =>
        `products?filters[title][$contains]=${title}&populate=*`,
    }),
    getReviewsByProductId: builder.query({
      query: (productId) => `/reviews?product=${productId}`,
      providesTags: ["review"],
    }),
    addReview: builder.mutation<void, CreateReviewReq>({
      query: (newReview) => ({
        url: "/reviews",
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `/reviews/${id}`, // Using PUT to update the review
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`, // DELETE request to the review ID
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
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
  useGetAllCatQuery,
  useSearchProductsQuery,
  useGetReviewsByProductIdQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = apiSlice;
