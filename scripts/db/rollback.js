import path from 'path';

import {spawn} from 'child-process-promise';
import {parseURL} from 'whatwg-url';

import '../../server/initialize';

const spawnOptions = {cwd: path.join(__dirname, '../..'), stdio: 'inherit'};

(async () => {
  const parts = parseURL(process.env.POSTGRES_SERVICE_URL);

  // Strip our search params
  const url = `${parts.scheme}://${parts.username}@${parts.host}:${parts.port ||
    5432}/${parts.path[0]}`;

  try {
    await spawn(
      './node_modules/.bin/sequelize',
      ['db:migrate:undo', `--url=${url}`],
      spawnOptions,
    );
    console.log('*************************');
    console.log('Migration successful');
  } catch (err) {
    console.log('*************************');
    console.log('Migration failed. Error:', err.message);
  }

  process.exit(0);
})();
