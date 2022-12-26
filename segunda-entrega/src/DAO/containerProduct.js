import { ContainerMongoDB } from "./containerMongoDB.js";
import { Container } from "./containerFileSystem.js";
import { PERSISTENCIA } from "../../config/cfg.js";
import mongoose, { Schema } from "mongoose";
import { ContainerFirestore } from "./containerFirestore.js";

export const productSchema = new Schema({
  _id: Number,
  name: String,
  description: String,
  img: String,
  price: Number,
  code: Number,
  stock: Number,
});
const productModel = mongoose.model("products", productSchema);

let containerProducts;
switch (PERSISTENCIA) {
  case "mongodb": {
    containerProducts = new ContainerMongoDB(productModel);
    break;
  }
  case "firestore": {
    containerProducts = new ContainerFirestore("products");
    break;
  }
  default: {
    containerProducts = new Container("../products.txt");
  }
}
export { containerProducts };
