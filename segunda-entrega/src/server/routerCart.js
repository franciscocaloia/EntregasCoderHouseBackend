import express, { json } from "express";
import {
  getById,
  postCartProduct,
  deleteCart,
  deleteCartProduct,
  postCart,
} from "../controller/controllerCart.js";

export const routerCart = express.Router();

routerCart.post("/", async (req, res) => {
  const json = await postCart({ products: [] });
  res.json(json ? json : { error: "no se pudo agregar el carro" });
});
routerCart.get("/:id/products", async (req, res) => {
  const json = await getById(parseInt(req.params.id));
  res.json(json ? json.products : { error: "no se pudo encontrar el carro" });
});
routerCart.post("/:id/products", async (req, res) => {
  const json = await postCartProduct(
    parseInt(req.params.id),
    parseInt(req.body.idProduct)
  );
  res.json(json ? json : { error: "no se pudo agregar el carro" });
});
routerCart.delete("/:id/products/:idProduct", async (req, res) => {
  const json = await deleteCartProduct(
    parseInt(req.params.id),
    parseInt(req.params.idProduct)
  );
  res.json(json ? json : { error: "No se pudo eliminar el producto" });
});
routerCart.delete("/:id", async (req, res) => {
  const json = await deleteCart(parseInt(req.params.id));
  res.json(json ? json : { error: "No se pudo eliminar el producto" });
});
