//FILE SYSTEM
const fs = require("fs");
class Container {
  constructor(path) {
    this.path = path;
  }
  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (error) {
      console.log(error);
    }
  }
  async save(object) {
    try {
      const content = await this.getAll();
      content.push({
        id: content.at(-1) ? content.at(-1).id + 1 : 1,
        ...object,
      });
      await fs.promises.writeFile(this.path, JSON.stringify(content));
      return content.at(-1).id;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const content = await this.getAll();
      return content.find((element) => element.id === id);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const content = await this.getAll();
      content.forEach((element, index) => {
        if (element.id === id) content.splice(index, 1);
      });
      await fs.promises.writeFile(this.path, JSON.stringify(content));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");
    } catch (error) {
      console.log(error);
    }
  }
}

const containerPrueba = new Container("./info.txt");

//SERVER
const express = require("express");
const app = express();
app.get("/productos", async (peticion, respuesta) => {
  respuesta.json(await containerPrueba.getAll());
});

app.get("/productoRandom", async (peticion, respuesta) => {
  respuesta.json(
    await containerPrueba.getById(Math.floor(Math.random() * 4) + 1)
  );
});

const connect = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => resolve(server));
    app.on("error", (error) => reject(error));
  });
};

module.exports = { connect };
