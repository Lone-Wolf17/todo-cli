import {config as dotEnvConfig } from "dotenv";

dotEnvConfig();

/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

export default {
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 1337,
  MONGO_URI: process.env.MONGO_URI ?? "",
} as const;
