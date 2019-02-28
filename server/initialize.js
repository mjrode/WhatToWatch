import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import defaults from 'lodash/defaults';

// Default environment is development to prevent "accidents"
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Reads in the needed config file from config/
const env = dotenv.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', 'config', `${process.env.NODE_ENV}.env`),
  ),
);

// Sets all values from the config file
defaults(process.env, env);
