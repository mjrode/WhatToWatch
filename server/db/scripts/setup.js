/* eslint-disable no-console */
const {exec} = require('child_process');
const configs = require('../config/config');

const mode = (
  process.argv.find(arg => /production$|development$/.test(arg)) ||
  'development'
).replace(/[^\w]/g, '');

const {username, database, host} = configs[mode];

if (!username || !database || !host) {
  console.error('Please ensure all required parameters are supplied:');
  console.error('username:', username);
  console.error('database:', database);
  console.error('host:', host);
  process.exit(1);
}

console.log(username, database, host);

exec(
  `createdb -U ${username} -h ${host} ${database}`,
  (err, stdout, stderr) => {
    if (err) {
      console.error('Error creating DB.');
      console.error(err || stderr);
      process.exit(1);
    }

    console.log('Created DB.');
    exec(
      `./node_modules/.bin/sequelize db:migrate --env ${mode}`,
      (err2, stdout2) => {
        if (err2) {
          console.error('Error running migrations.');
          console.error(err2);
          console.error('Dropping DB');
          exec(
            `dropdb -U ${username} -h ${host} ${database}`,
            (err3, stdout3, stderr3) => {
              if (err2) {
                console.error('Error dropping DB');
                console.error(err3 || stderr3);
                process.exit(1);
              }

              console.info('Dropped DB.');
              process.exit(0);
            },
          );
        } else {
          console.log(stdout2);
          console.log('Migrations complete.');
          console.log('Process finished. Exiting.');
          process.exit(0);
        }
      },
    );
  },
);
