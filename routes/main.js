var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'YouStar' });
});

module.exports = router;
