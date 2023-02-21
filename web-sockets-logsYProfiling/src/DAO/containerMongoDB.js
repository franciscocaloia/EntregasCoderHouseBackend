import { loggerFile } from "../logger/loggerPino.js";

export class ContainerMongoDB {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll() {
    try {
      const result = await this.collection.find({}).toArray();
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
  async getById(id) {
    try {
      const result = await this.collection.findOne({ _id: id });
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
  async getByFilter(filter) {
    try {
      const result = await this.collection.findOne(filter);
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
  async save(object) {
    try {
      const id = await this.collection.countDocuments();
      const result = await this.collection.insertOne({
        _id: id + 1,
        ...object,
      });
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
  async update(id, object) {
    try {
      const result = await this.collection.updateOne(
        { _id: id },
        { $set: object }
      );
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
  async delete(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });
      return result;
    } catch (error) {
      loggerFile.error(error);
    }
  }
}
