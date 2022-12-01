const Container = require("../class/container");
const express = require("express");
const { isAdmin } = require("./routerAdmin");

const routerProducts = express.Router();
const productsContainer = new Container("./products.txt");

const getProduct = async (id) => {
  return await productsContainer.getById(id);
};

routerProducts.get("/", async (req, res) => {
  const json = await productsContainer.getAll();
  res.json(json);
});
routerProducts.get("/:id", async (req, res) => {
  const json = await productsContainer.getById(parseInt(req.params.id));
  res.json(json);
});
routerProducts.post("/", isAdmin, async (req, res) => {
  const json = await productsContainer.save(req.body);
  res.json(json ? json : { error: "No se pudo guardar el producto" });
});
routerProducts.put("/:id", isAdmin, async (req, res) => {
  const json = await productsContainer.update(req.body);
  res.json(json ? json : { error: "No se pudo actualizar el producto" });
});
routerProducts.delete("/:id", isAdmin, async (req, res) => {
  res.json(
    (await productsContainer.deleteById(parseInt(req.params.id)))
      ? { success: "producto eliminado correctamente" }
      : { error: "No se pudo eliminar el producto" }
  );
});

exports.routerProducts = routerProducts;
exports.getProduct = getProduct;
