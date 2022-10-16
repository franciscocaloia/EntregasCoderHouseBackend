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
