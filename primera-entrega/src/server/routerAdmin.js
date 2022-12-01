const express = require("express");
const routerAdmin = express.Router();
let admin = false;
routerAdmin.get("/login", (req, res) => {
  admin = true;
  res.sendStatus(200);
});

routerAdmin.get("/logout", (req, res) => {
  admin = false;
  res.sendStatus(200);
});

const isAdmin = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.isAdmin = isAdmin;
exports.routerAdmin = routerAdmin;
