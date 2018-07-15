var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/page1', function(req, res, next) {
  res.render('page1', { title: 'Express' });
});

module.exports = router;
