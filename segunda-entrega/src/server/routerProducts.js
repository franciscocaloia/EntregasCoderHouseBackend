import {
  deleteProduct,
  getAllProducts,
  getById,
  postProduct,
  updateProduct,
} from "../controller/controllerProduct.js";
import express from "express";

export const routerProducts = express.Router();

export const getProduct = async (id) => {
  return await getById(id);
};
routerProducts.get("/", async (req, res) => {
  const json = await getAllProducts();
  res.json(json ? json : { error: "No se pudo guardar el producto" });
});
routerProducts.get("/:id", async (req, res) => {
  const json = await getById(parseInt(req.params.id));
  res.json(json ? json : { error: "No se pudo guardar el producto" });
});
routerProducts.post("/", async (req, res) => {
  const json = await postProduct(req.body);
  res.json(json ? json : { error: "No se pudo guardar el producto" });
});
routerProducts.put("/:id", async (req, res) => {
  const json = await updateProduct(req.params.id, req.body);
  res.json(json ? json : { error: "No se pudo actualizar el producto" });
});
routerProducts.delete("/:id", async (req, res) => {
  const json = await deleteProduct(parseInt(req.params.id));
  res.json(json ? json : { error: "No se pudo eliminar el producto" });
});
