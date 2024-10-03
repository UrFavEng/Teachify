import { default as axiosClient } from "./axiosClient";
const getLatestProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (id: string) =>
  axiosClient.get(`/products/${id}?populate=*`);
const getProductsByCat = (cat: string) =>
  axiosClient.get(`/products?filters[category][$eq]=${cat}&populate=*`);
export default { getLatestProducts, getProductById, getProductsByCat };
