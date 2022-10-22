class Container {
  constructor() {
    this.content = [];
  }

  save(object) {
    this.content.push(object);
  }
  getById(id) {
    return this.content.find((element) => element.id === id);
  }
  getAll() {
    return this.content;
  }
  deleteById(id) {
    this.content.forEach((element, index) => {
      if (element.id === id) this.content.splice(index, 1);
    });
  }
  deleteAll() {
    this.content.splice(0, this.content.length);
  }
}

const containerPrueba = new Container();

containerPrueba.save({ id: 1, name: "producto1", price: 2332 });
containerPrueba.save({ id: 2, name: "producto2", price: 2332 });
containerPrueba.save({ id: 3, name: "producto3", price: 2332 });
containerPrueba.save({ id: 4, name: "producto4", price: 2332 });
containerPrueba.save({ id: 5, name: "producto5", price: 2332 });
console.log("\n\nTodos los productos guardados: ");
console.log(containerPrueba.getAll());
console.log("\n\nNombre del producto con ID = 3: ");
console.log(containerPrueba.getById(3).name);
containerPrueba.deleteById(4);
console.log("\n\nContenedor luego de eliminar el producto con ID = 4");
console.log(containerPrueba.getAll());
containerPrueba.deleteAll();
console.log("\n\nContenedor luego de eliminar todos los productos: ");
console.log(containerPrueba.getAll());
