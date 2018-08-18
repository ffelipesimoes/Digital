var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/consulta', function(req, res, next) {
  res.render('consulta', { title: 'Express' });
});

module.exports = router;
