'use strict';

const Hapi = require('@hapi/hapi');

const formatJSONHandler = require("./format-json")
const api = require("./api")

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('@hapi/vision'));
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
    // routes
    server.route([{
        method: 'POST',
        path: '/format-json',
        handler: formatJSONHandler,
    }, {
        method: 'GET',
        path: '/',
        handler: api,
    }]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();