var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fibonacci/:length', function(req, res, next) {
    var length  = parseInt(req.params.length);
     fibonacci = [];

    if(length>1)
    {
        fibonacci[0] = 0;
        fibonacci[1] = 1;

        for (let i = 2; i < length; i++) {
            fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        }

        res.end(String(fibonacci[fibonacci.length - 1]));
    }
    else
    {
        res.end("Fibonacci calculation not possible !");
    }
});

module.exports = router;