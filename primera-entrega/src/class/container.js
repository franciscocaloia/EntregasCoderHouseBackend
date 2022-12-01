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
      return content.at(-1);
    } catch (error) {
      console.log(error);
    }
  }

  async update(object) {
    try {
      const content = (await this.getAll()).map((element) =>
        element.id === object.id ? object : element
      );
      await fs.promises.writeFile(this.path, JSON.stringify(content));
      return await this.getById(object.id);
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
      let deleted = false;
      await content.forEach(async (element, index) => {
        if (element.id === id) {
          content.splice(index, 1);
          deleted = true;
        }
      });
      await fs.promises.writeFile(this.path, JSON.stringify(content));
      return deleted;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = Container;
