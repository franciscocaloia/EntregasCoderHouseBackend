import mongoose, { Schema } from "mongoose";
import { PERSISTENCIA } from "../../config/cfg.js";
import { productSchema } from "../DAO/containerProduct.js";
import { Container } from "./containerFileSystem.js";
import { ContainerFirestore } from "./containerFirestore.js";
import { ContainerMongoDB } from "./containerMongoDB.js";
const cartModel = mongoose.model(
  "carts",
  new Schema({
    _id: Number,
    products: [productSchema],
  })
);
let containerCart;
switch (PERSISTENCIA) {
  case "mongodb": {
    containerCart = new ContainerMongoDB(cartModel);
    break;
  }
  case "firestore": {
    containerCart = new ContainerFirestore("carts");
    break;
  }
  default: {
    containerCart = new Container("../carts.txt");
  }
}
export { containerCart };
