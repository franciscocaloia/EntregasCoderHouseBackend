import { connect } from "./src/server/server.js";
const main = async () => {
  try {
    const server = await connect(8080);
    console.log("localhost:" + server.address().port);
  } catch (error) {
    console.log(error);
  }
};

main();
