export class ContainerMongoDB {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    return await this.model.find({});
  }
  async getById(id) {
    return await this.model.findById(id);
  }
  async save(object) {
    const lastObject = await this.model.findOne().sort({ _id: -1 });
    return await this.model.create({
      _id: lastObject ? lastObject._id + 1 : 1,
      ...object,
    });
  }
  async update(id, object) {
    return await this.model.findByIdAndUpdate(id, object, {
      returnDocument: "after",
    });
  }
  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
