var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aphrodite' });
  console.log("Sever is running at http://localhost:%d",port);
});

module.exports = router;
