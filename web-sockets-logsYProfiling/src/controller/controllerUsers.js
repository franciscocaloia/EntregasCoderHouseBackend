import { client } from "../cfg/mongodb.js";
import { ContainerMongoDB } from "../DAO/containerMongoDB.js";
const usersCollection = client.db().collection("users");
const containerUsers = new ContainerMongoDB(usersCollection);

function getById(id) {
  return containerUsers.getById(id);
}
function getByFilter(filter) {
  return containerUsers.getByFilter(filter);
}
const postUser = async (user) => {
  return await containerUsers.save(user);
};
export const controllerUsers = { getById, getByFilter, postUser };
