import pino from "pino";
import { LOG_LEVEL } from "../cfg/config.js";
export const logger = pino({
  level: LOG_LEVEL,
});
export const loggerFile = pino(
  { level: LOG_LEVEL },
  pino.multistream(
    [
      {
        level: "warn",
        stream: pino.destination(`./warn.log`),
      },
      {
        level: "error",
        stream: pino.destination(`./error.log`),
      },
    ],
    { dedupe: true }
  )
);
