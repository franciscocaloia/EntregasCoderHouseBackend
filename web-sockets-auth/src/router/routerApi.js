import express from "express";
import { fork } from "child_process";
export const routerApi = express.Router();
routerApi.get("/randoms/info", (req, res) => {
  res.send(`pid: ${process.pid}`);
});
routerApi.get("/randoms/:max", (req, res) => {
  const forked = fork("src/router/randoms.js");
  forked.send(req.params.max ? parseInt(req.params.max) : 100000000);
  forked.on("message", (randoms) => {
    res.json(randoms);
  });
});
