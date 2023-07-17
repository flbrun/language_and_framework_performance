var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/greeting/:name', function(req, res, next) {
    var name  = req.params.name;
    res.end("Hello " + name + " !");
});

module.exports = router;