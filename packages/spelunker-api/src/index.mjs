import server from './lib/server';
import { log } from './lib/utils/logger';

server.listen(process.env.API_PORT, () => {
  log(`listening on port ${process.env.API_PORT}`);
});
