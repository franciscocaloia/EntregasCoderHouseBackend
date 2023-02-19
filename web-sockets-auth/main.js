import { Server } from "./src/server/server.js";
import { args, cpus } from "./src/cfg/config.js";
import cluster from "cluster";

const main = async () => {
  try {
    if (args.mode === "FORK") {
      const server = new Server();
      const port = await server.connect(args.port);
      console.log("localhost:" + port);
    } else if (args.mode === "CLUSTER") {
      if (cluster.isPrimary) {
        for (let i = 0; i < cpus; i++) {
          cluster.fork();
        }
      } else {
        const server = new Server();
        const port = await server.connect(args.port);
        console.log("localhost:" + port);
        console.log(process.pid);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

main();
