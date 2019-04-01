const proxy = require('http-proxy-middleware');

module.exports = function(server) {
  server.use(
    proxy(['/api', '/auth/google', '/auth'], {target: 'http://localhost:8080'}),
  );
};
