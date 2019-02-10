module.exports = function(app, db) {
  app.post('/shows', (req, res) => {

    console.log(req.body);
    res.send('Hello')
  });
};