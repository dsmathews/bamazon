const db = require('../models');

module.exports = function(app) {

  // GET route for retrieving all products
  app.get('/api/Products', function(req, res) {
    db.Products.findAll({}).then(function(bamazondDB) {
      res.json(bamazondDB);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // GET route for retrieving a single specified product
  app.get('/api/Products/:id', function(req, res) {
    db.Products.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(bamazondDB) {
      res.json(bamazondDB);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // POST route for adding new products
  app.post('/api/Products', function(req, res) {
    db.Products.create(req.body).then(function(bamazonDB) {
      res.json(bamazonDB);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // PUT route for updating products
  app.put('/api/Products/:id', function(req, res) {
    db.Products.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
    }).then(function(bamazonDB) {
      res.json(bamazonDB);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // DELETE route for deleting products
  app.delete('/api/Products/:id', function(req, res) {
    db.Products.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(bamazonDB) {
      res.json(bamazonDB);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

};
