import express from "express";
import { fork } from "child_process";
import { args } from "../cfg/config.js";
import { randoms } from "./randoms.js";

export const routerApi = express.Router();
routerApi.get("/randoms/info", (req, res) => {
  res.send(`pid: ${process.pid}`);
});
routerApi.get("/randoms/:max", (req, res) => {
  if (args.bloq) {
    const random = randoms(parseInt(req.params.max ?? "100000"));
    res.json(random);
  } else {
    const forked = fork("src/router/randoms.js");
    forked.send(req.params.max ? parseInt(req.params.max) : 10000000);
    forked.on("message", (random) => {
      res.json(random);
    });
  }
});
