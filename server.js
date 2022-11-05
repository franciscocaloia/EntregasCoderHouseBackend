//SERVER
const express = require("express");
const { routerApi } = require("./routerApi.js");
const app = express();
app.use(express.json());
app.use("/api", routerApi);

const connect = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    app.on("error", (error) => reject(error));
  });
};

module.exports = { connect };
