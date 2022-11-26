//SERVER
const express = require("express");
// const { routerApi } = require("./routerApi.js");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");

const Container = require("../class/container");
const productContainer = new Container("products.txt");
const messageContainer = new Container("messages.txt");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// app.use("/api", routerApi);

app.get("/", (req, res) => {
  res.render("productForm");
});

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

io.on("connection", async (socket) => {
  socket.emit("productList", await productContainer.getAll());
  socket.emit("messageList", await messageContainer.getAll());

  socket.on("newProduct", async (product) => {
    await productContainer.save(product);
    io.sockets.emit("productList", await productContainer.getAll());
  });

  socket.on("newMessage", async (message) => {
    await messageContainer.save(message);
    io.sockets.emit("messageList", await messageContainer.getAll());
  });
});
const connect = (port) => {
  return new Promise((resolve) => {
    const server = httpServer.listen(port, () => resolve(server));
  });
};

module.exports = { connect };
