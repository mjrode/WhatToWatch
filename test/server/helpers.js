import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import app from '../../index';

export const authorizedAgent = async email => {
  var agent = chai.request.agent(app);
  const res = await agent
    .post('/api/auth/login')
    .send({ email: 'testuser@email.com', password: 'password' })
    .redirects(1);
  console.log('res body', res.body);
  console.log('res headers', res.headers);

  return agent;
};
