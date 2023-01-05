export class ContainerMongoDB {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll() {
    return await this.collection.find({}).toArray();
  }
  async getById(id) {
    return await this.collection.findOne({ _id: id });
  }
  async save(object) {
    const id = await this.collection.countDocuments();
    return await this.collection.insertOne({
      _id: id + 1,
      ...object,
    });
  }
  async update(id, object) {
    return await this.collection.updateOne({ _id: id }, { $set: object });
  }
  async delete(id) {
    return await this.collection.deleteOne({ _id: id });
  }
}
