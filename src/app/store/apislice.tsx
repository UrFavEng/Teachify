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
  getCategories,
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
        `Bearer 526666a9df115fd660ece5469eaa9b26b1a2379a4235cdd1adcf308c82912e65142d700f158d3d03cd29f2334c01fb385d718482083fe7a2f427d1b9c6f6419182a209e583d4161e73a8ce64a60ca80fceb5ad67b6402c544c978829ace4061cf74b14bf1ac12128ade4ff250a06a75e583a6f329eb9bce463c1fb2473c1f962`
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
      { cat: string | undefined; price: string }
    >({
      query: ({ cat, price }) =>
        `products?filters[category][title][$eqi]=${cat}&sort=price:${price}&populate=*`,
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
    getCategories: builder.query<getCategories, void>({
      query: () => "categories", // المسار لجلب الفئات
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
  useGetCategoriesQuery,
} = apiSlice;
