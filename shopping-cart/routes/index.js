var express = require('express');
var router = express.Router();
var product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
  product.find((error, docs) => {
      const productChunks = [];
      const chunkSize = 3;
      for(var i = 0; i < docs.length; i += chunkSize){
        productChunks.push(docs.slice(i, i + chunkSize))
      }
      console.log(productChunks)
      res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

module.exports = router;
