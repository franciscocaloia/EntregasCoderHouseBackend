//SERVER
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { faker } from "@faker-js/faker";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { controllerProducts } from "../controller/controllerProduct.js";
import { controllerMessages } from "../controller/controllerMessages.js";
const path =
  "D:\\ESCRITORIO\\CoderHouse\\EntregasGithubBackend\\web-sockets-mocksYnormalizr\\public";
// const path =
//   "C:\\Users\\zapat\\Escritorio\\Fran\\EntregasCoderHouseBackend\\web-sockets-mocksYnormalizr\\public";
const app = express();
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://franciscocaloia:clemente12@coderhouse.ubggka6.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: "secret",
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
      signed: true,
      expires: 60000,
    },
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  if (req.session.name) {
    req.session.resetMaxAge();
    res.render("index", {
      name: req.session.name,
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/signin", (req, res) => {
  res.sendFile("signin.html", {
    root: path,
  });
});
app.get("/login", (req, res) => {
  res.sendFile("login.html", {
    root: path,
  });
});
app.post("/login", (req, res) => {
  const name = req.body.name;
  req.session.name = name;
  if (name.trim() === "") {
    return res.json({ error: "nombre invalido" });
  }
  res.json({ name });
});
app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ error });
    }
    res.json({ success: "logout success" });
  });
});
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
