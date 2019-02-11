// routes/index.js
const showRoutes = require('./show_routes');
module.exports = function(app, db) {
  showRoutes(app, db);
  // Other route groups could go here, in the future
};