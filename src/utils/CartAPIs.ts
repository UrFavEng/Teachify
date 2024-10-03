import axiosClient from "./axiosClient";

const addToCart = (payload) => axiosClient.post(`/carts`, payload);
const getUserCartItems = (email: string) =>
  axiosClient.get(
    `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );
const deleteCart = (id: string) => axiosClient.delete(`/carts/${id}`);
export default { addToCart, getUserCartItems, deleteCart };
