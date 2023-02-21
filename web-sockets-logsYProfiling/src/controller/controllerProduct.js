import { ContainerMongoDB } from "../DAO/containerMongoDB.js";
import { client } from "../cfg/mongodb.js";
const productsCollection = client.db().collection("products");
const containerProducts = new ContainerMongoDB(productsCollection);
const getAllProducts = async () => {
  return await containerProducts.getAll();
};
const getById = async (id) => {
  return await containerProducts.getById(id);
};
const postProduct = async (product) => {
  return await containerProducts.save(product);
};
const updateProduct = async (id, product) => {
  return await containerProducts.update(id, product);
};
const deleteProduct = async (id) => {
  return await containerProducts.delete(id);
};

export const controllerProducts = {
  getAllProducts,
  getById,
  postProduct,
  updateProduct,
  deleteProduct,
};
