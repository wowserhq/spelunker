import server from './lib/server.mjs';
import { log } from "./lib/utils/logger.mjs";

server.listen(process.env.API_PORT, () => {
  log(`listening on port ${process.env.API_PORT}`);
});
