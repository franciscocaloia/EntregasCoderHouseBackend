//SERVER
import express from "express";
import { faker } from "@faker-js/faker";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { controllerProducts } from "../controller/controllerProduct.js";
import { controllerMessages } from "../controller/controllerMessages.js";
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/api/products-test", (req, res) => {
  const products = [];
  for (let i = 0; i < 5; i++) {
    products.push({
      _id: faker.random.numeric(3),
      name: faker.commerce.product(),
      description: faker.color.human(),
      img: "",
      price: faker.random.numeric(4),
      code: faker.random.numeric(4),
      stock: faker.random.numeric(4),
    });
  }
  res.json(products);
});

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

io.on("connection", async (socket) => {
  socket.emit("productList", await controllerProducts.getAllProducts());
  socket.emit("messageList", await controllerMessages.getAllMessages());

  socket.on("newProduct", async (product) => {
    await controllerProducts.getAllProducts(product);
    await controllerProducts.postProduct(product);
    io.sockets.emit(
      "productList",
      await controllerProducts.getAllProducts(product)
    );
  });

  socket.on("newMessage", async (message) => {
    await controllerMessages.postMessage(message);
    io.sockets.emit("messageList", await controllerMessages.getAllMessages());
  });
});
export const connect = (port) => {
  return new Promise((resolve) => {
    const server = httpServer.listen(port, () => resolve(server));
  });
};
