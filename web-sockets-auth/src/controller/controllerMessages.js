import { client } from "../cfg/mongodb.js";
import { ContainerMongoDB } from "../DAO/containerMongoDB.js";
import { normalize, schema } from "normalizr";
const messagesCollection = client.db().collection("messages");
const containerMessages = new ContainerMongoDB(messagesCollection);
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);
const messageArray = new schema.Array(messageSchema);
const getAllMessages = async () => {
  return normalize(await containerMessages.getAll(), messageArray);
};
export const getById = async (id) => {
  return containerMessages.getById(id);
};
export const postMessage = async (message) => {
  return await containerMessages.save(message);
};
export const updatemessage = async (id, message) => {
  return await containerMessages.update(id, message);
};
export const deletemessage = async (id) => {
  return await containerMessages.delete(id);
};

export const controllerMessages = {
  getAllMessages,
  getById,
  postMessage,
  updatemessage,
  deletemessage,
};
