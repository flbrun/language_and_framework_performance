'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.start();
console.log('Server running on %s', server.info.uri);

server.route({
    method: 'GET',
    path: '/hapi/hello-world',
    handler: (req, h) => {

        return 'Hello World !';
    }
});

server.route({
    method: 'GET',
    path: '/hapi/greeting/{name}',
    handler: (req, h) => {
       let name =  req.params.name;

        return 'Hello ' + name + " !";
    }
});

server.route({
    method: 'GET',
    path: '/hapi/fibonacci/{length}',
    handler: (req, h) => {
        let length =  req.params.length;

        let fibonacci = [];

        if(length>1)
        {
            fibonacci[0] = 0;
            fibonacci[1] = 1;

            for (let i = 2; i < length; i++) {
                fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
            }

            return String(fibonacci[fibonacci.length - 1]);
        }
        else
        {
            return "Fibonacci calculation not possible !";
        }
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});




