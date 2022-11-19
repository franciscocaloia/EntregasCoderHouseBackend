const { connect } = require("./src/server/server");

const main = async () => {
  try {
    const server = await connect(8080);
    console.log(server.address().port);
  } catch (error) {
    console.log(error);
  }
};

main();
