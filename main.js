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

(async () => {
  console.log(
    "ID del producto guardado: " +
      (await containerPrueba.save({ name: "producto1", price: 2332 }))
  );
  console.log(
    "ID del producto guardado: " +
      (await containerPrueba.save({ name: "producto2", price: 2332 }))
  );
  console.log(
    "ID del producto guardado: " +
      (await containerPrueba.save({ name: "producto3", price: 2332 }))
  );
  console.log(
    "ID del producto guardado: " +
      (await containerPrueba.save({ name: "producto4", price: 2332 }))
  );
  console.log("\n\nTodos los productos guardados: ");
  console.log(await containerPrueba.getAll());
  console.log("\n\nProducto con ID = 3: ");
  console.log(await containerPrueba.getById(3));
  console.log("\n\nContenedor luego de eliminar el producto con ID = 4");
  await containerPrueba.deleteById(4);
  console.log(await containerPrueba.getAll());
  console.log("\n\nContenedor luego de eliminar todos los productos: ");
  await containerPrueba.deleteAll();
  console.log(await containerPrueba.getAll());
})();
