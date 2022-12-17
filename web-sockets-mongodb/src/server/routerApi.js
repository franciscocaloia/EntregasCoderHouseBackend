const Container = require("../class/container");
const express = require("express");

const routerApi = express.Router();
const containerPrueba = new Container("./info.txt");

routerApi.get("/",(req,res)=>{
  res.render("productForm",{});
});

routerApi.get("/productos", async (req, res) => {
  res.render("productList",{products: await containerPrueba.getAll()});
});
routerApi.get("/productos/:id", async (req, res) => {
  const foundProduct = await containerPrueba.getById(parseInt(req.params.id));
  res.render("productDetail.hbs", foundProduct);
});
routerApi.post("/productos", async (req, res) => {
  await containerPrueba.save(req.body)
  res.render("productForm");
});
routerApi.put("/productos", async (req, res) => {
  const updated = await containerPrueba.update(req.body);
  res.json(updated ? req.body : { error: "producto no encontrado" });
});
routerApi.delete("/productos/:id", async (req, res) => {
  const deleted = await containerPrueba.deleteById(parseInt(req.params.id));
  res.json(
    deleted
      ? { exito: "producto eliminado correctamente" }
      : { error: "producto no encontrado" }
  );
});

exports.routerApi = routerApi;
