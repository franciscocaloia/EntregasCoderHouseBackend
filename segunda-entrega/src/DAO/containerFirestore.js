import { firestoreDB } from "../db/fireStoreClient.js";

export class ContainerFirestore {
  constructor(collection) {
    this.collection = firestoreDB.collection(collection);
  }
  async getAll() {
    const snapshot = await this.collection.get();
    return await snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  async getById(id) {
    const doc = await this.collection.doc(id.toString()).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  }
  async save(object) {
    const lastObjectSnap = await this.collection.get();
    return await this.collection
      .doc(
        lastObjectSnap.docs[0]
          ? (parseInt(lastObjectSnap.docs.at(-1).id) + 1).toString()
          : "1"
      )
      .set(object);
  }
  async update(id, object) {
    return await this.collection.doc(id.toString()).update(object);
  }
  async delete(id) {
    return await this.collection.doc(id.toString()).delete();
  }
}
