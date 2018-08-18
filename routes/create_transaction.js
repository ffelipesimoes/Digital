var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create_transaction', function(req, res, next) {
  res.render('create_transaction', { title: 'Express' });
});

module.exports = router;
