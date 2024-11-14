var express = require('express');
var router = express.Router();

// Example route for user profile (if needed in the future)
router.get('/', function(req, res, next) {
  res.send('Respond with a resource');
});

module.exports = router;
