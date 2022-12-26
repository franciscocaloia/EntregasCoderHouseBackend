//SERVER
// const { routerProducts } = require("./routerProducts");
// const { routerAdmin } = require("./routerAdmin");
// const { routerCart } = require("./routerCart");
import { routerCart } from "./routerCart.js";
import { routerProducts } from "./routerProducts.js";
import express from "express";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/ecommerce");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", routerAdmin);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

export const connect = (port) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server));
  });
};
