//SERVER
const express = require("express");
const { routerProducts } = require("./routerProducts");
const { routerAdmin } = require("./routerAdmin");
const { routerCart } = require("./routerCart");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routerAdmin);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);

const connect = (port) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server));
  });
};

module.exports = { connect };
