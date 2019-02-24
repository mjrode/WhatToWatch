import { forEach } from 'lodash';
import requireDirectory from 'require-directory';

const factories = requireDirectory(module, './');

forEach(factories, (value, key) => {
  factories[key] = value.default;
});
