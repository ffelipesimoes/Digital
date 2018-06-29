var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check_wallet', function(req, res, next) {
  res.render('check_wallet', { title: 'Checking Wallet' });
});

module.exports = router;
