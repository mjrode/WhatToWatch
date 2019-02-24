import { assert } from 'chai';
import factories from '../../factories';
import truncate from '../../truncate';

import models from '../../../server/models';

describe('User model', () => {
  let user;

  beforeEach(async () => {
    await truncate();

    console.log('mike=========', factories);
    user = await factories.user();
  });

  it('should generate a user from the factory', async () => {
    assert.isOk(user.id);
  });

  it('should truncate the user table with each test', async () => {
    const count = await models.User.count();

    assert.equal(count, 1);
  });
});
