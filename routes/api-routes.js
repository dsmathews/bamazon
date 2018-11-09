const db = require('../models');

module.exports = function(app) {

  // GET route for retrieving all products
  app.get('/api/products', function(req, res) {
    db.Product.findAll({}).then(function(rows) {
      res.json(rows);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // GET route for retrieving a single specified product
  app.get('/api/products/:id', function(req, res) {
    db.Product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // POST route for adding new products
  app.post('/api/products', function(req, res) {
    db.Product.create(req.body).then(function(rows) {
      res.json(rows);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // PUT route for updating products
  app.put('/api/products/:id', function(req, res) {
    db.Product.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
    }).then(function() {
      res.json({success:true});
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // DELETE route for deleting products
  app.delete('/api/products/:id', function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.json({success:true});
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

};
