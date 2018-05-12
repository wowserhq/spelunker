import server from './lib/server';
import { log } from './lib/utils/logger';

server.listen(process.env.API_PORT, () => {
  log(`listening on localhost:${process.env.API_PORT}`);
});
