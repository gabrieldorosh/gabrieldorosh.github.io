import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const EventEmitter = require("eventemitter3");

export { EventEmitter };
export default EventEmitter;
