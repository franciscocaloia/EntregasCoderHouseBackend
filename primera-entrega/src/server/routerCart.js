const Container = require("../class/container");
const express = require("express");
const { getProduct } = require("./routerProducts");

const routerCart = express.Router();
const cartContainer = new Container("./carts.txt");

routerCart.post("/", async (req, res) => {
  const json = await cartContainer.save({ products: [] });
  res.json(json.id);
});
routerCart.get("/:id/products", async (req, res) => {
  const json = await cartContainer.getById(parseInt(req.params.id));
  res.json(json.products);
});
routerCart.post("/:id/products", async (req, res) => {
  const cart = await cartContainer.getById(parseInt(req.params.id));
  const product = await getProduct(parseInt(req.body.idProduct));
  if (product) {
    cart.products.push(product);
    const json = await cartContainer.update(cart);
    res.json(
      json ? json : { error: "no se pudo agregar el producto al carro" }
    );
  } else {
    res.json({ error: "no se pudo agregar el producto al carro" });
  }
});
routerCart.delete("/:id/products/:idProduct", async (req, res) => {
  const cart = await cartContainer.getById(parseInt(req.params.id));
  console.log("borrados");
  const filteredProducts = cart.products.filter(
    (e) => e.id !== parseInt(req.params.idProduct)
  );
  cart.products = filteredProducts;
  console.log(filteredProducts);
  res.json(
    (await cartContainer.update(cart))
      ? { success: "producto eliminado correctamente" }
      : { error: "No se pudo eliminar el producto" }
  );
});
routerCart.delete("/:id", async (req, res) => {
  const cart = await cartContainer.getById(parseInt(req.params.id));
  while (cart.products.length) {
    cart.products.pop();
  }
  res.json(
    (await cartContainer.update(cart))
      ? { success: "producto eliminado correctamente" }
      : { error: "No se pudo eliminar el producto" }
  );
});

exports.routerCart = routerCart;
