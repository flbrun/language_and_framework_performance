const Router = require("@koa/router");

const router = new Router({
    prefix:'/koa'
})

router.get('/hello-world', (ctx) => (ctx.body = "Hello World !"));


router.get('/greeting/:name', (ctx) =>
{
    let name = ctx.params.name;
    ctx.body = "Hello " + name + " !";
});


router.get('/fibonacci/:length', (ctx) =>
{
    let length = ctx.params.length;

    fibonacci = [];

    if(length>1)
    {
        fibonacci[0] = 0;
        fibonacci[1] = 1;

        for (let i = 2; i < length; i++) {
            fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        }

        ctx.body = String(fibonacci[fibonacci.length - 1]);
    }
    else
    {
        ctx.body = "Fibonacci calculation not possible !";
    }
});

module.exports = router;