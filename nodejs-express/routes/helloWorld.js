var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello-world', function(req, res, next) {
    res.end("Hello World !");
});

module.exports = router;