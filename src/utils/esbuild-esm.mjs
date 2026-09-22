import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");

export const {
  analyzeMetafile,
  analyzeMetafileSync,
  build,
  buildSync,
  context,
  formatMessages,
  formatMessagesSync,
  initialize,
  stop,
  transform,
  transformSync,
  version,
} = esbuild;

export default esbuild;
