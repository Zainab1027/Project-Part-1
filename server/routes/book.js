let express = require('express');
let router = express.Router();

/* GET books listing. */
router.get('/', function (req, res, next) {
  res.send('Books Page');
});

module.exports = router;
