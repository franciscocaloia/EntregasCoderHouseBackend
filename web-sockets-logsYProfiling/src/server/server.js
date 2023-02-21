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
import { routerAuth } from "../router/routerAuth.js";
import passport from "passport";
import { args, cpus, MONGO_URL, SESSION_SECRET } from "../cfg/config.js";
import { routerApi } from "../router/routerApi.js";
import compression from "compression";
import { logger, loggerFile } from "../logger/loggerPino.js";
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
      signed: true,
      expires: 60000,
    },
  })
);
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  logger.info(`Metodo: ${req.method} |URL: ${req.originalUrl}`);
  next();
});

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(routerAuth);
app.use("/api", routerApi);

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      username: req.user.username,
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/info", (req, res) => {
  const info = {
    args: process.argv,
    os: process.platform,
    version: process.version,
    rss: process.memoryUsage().rss,
    execPath: process.execPath,
    pid: process.pid,
    cdw: process.cwd(),
    cpus: cpus,
  };
  // console.log(info);
  res.render("info", info);
});

app.get("/error", (req, res) => {
  res.render("error", { error: err });
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
app.all("*", (req, res, next) => {
  loggerFile.warn(`Ruta inexistente: ${req.originalUrl}`);
  next();
});
app.use((err, req, res, next) => {
  res.json({ error: err });
});

export class Server {
  #server;
  #io;
  constructor() {
    this.#server = new HTTPServer(app);
    this.#io = new IOServer(this.#server);
    this.#io.on("connection", async (socket) => {
      socket.emit("productList", await controllerProducts.getAllProducts());
      socket.emit("messageList", await controllerMessages.getAllMessages());
      socket.on("newProduct", async (product) => {
        await controllerProducts.getAllProducts(product);
        await controllerProducts.postProduct(product);
        this.#io.sockets.emit(
          "productList",
          await controllerProducts.getAllProducts(product)
        );
      });

      socket.on("newMessage", async (message) => {
        await controllerMessages.postMessage(message);
        this.#io.sockets.emit(
          "messageList",
          await controllerMessages.getAllMessages()
        );
      });
    });
  }
  connect(port) {
    return new Promise((resolve) => {
      const server = this.#server.listen(port, () =>
        resolve(server.address().port)
      );
    });
  }
}
