import { containerProducts } from "../DAO/containerProduct.js";
export const getAllProducts = async () => {
  return await containerProducts.getAll();
};
export const getById = async (id) => {
  return await containerProducts.getById(id);
};
export const postProduct = async (product) => {
  return await containerProducts.save(product);
};
export const updateProduct = async (id, product) => {
  return await containerProducts.update(id, product);
};
export const deleteProduct = async (id) => {
  return await containerProducts.delete(id);
};
