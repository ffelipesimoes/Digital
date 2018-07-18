var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create_btc_w', function(req, res, next) {
  res.render('create_btc_w', { title: 'Express' });
});

module.exports = router;
