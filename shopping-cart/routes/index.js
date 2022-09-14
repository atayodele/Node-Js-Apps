const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const passport = require('passport')
const product = require('../models/product')

var csrfProtection = csrf()
router.use(csrfProtection)

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

router.get('/user/signup', function(req, res, next) {
   res.render('user/signup', { title: 'Shopping Cart', csrfToken: req.csrfToken() });
});
router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));
router.get('/user/profile', function(req, res, next) {
  res.render('user/profile', { title: 'Shopping Cart' });
});

module.exports = router;
