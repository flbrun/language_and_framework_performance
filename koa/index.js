const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const App = new Koa();
const port = 8000;

const router = require("./router");

App.use(parser())
    .use(cors())
    .use(router.routes())
    .listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
