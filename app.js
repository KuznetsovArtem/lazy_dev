var express = require('express')
    , app  = express()
    , cons = require('consolidate')
    , MongoClient = require('mongodb').MongoClient
    , routes = require('./controllers/routes')
    , CONF = require('./config').config;

MongoClient.connect(CONF.local.dbConnectionUrl, function(err, db) {
    "use strict";
    if (err) throw err

    // TODO: each conf to file
    app.configure(function() {
        // template stuff
        app.engine('html', cons.swig);
        app.set('view engine', CONF.viewEngine);
        app.set('views', CONF.viewsFolder);
        //
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({ secret: CONF.sessionSecret }));
    });

    app.configure('dev', function() {
        app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        app.enable('case sensitive routes');

        app.use(function(req, res, next) {
            console.log('dev fx');
            console.log(arguments);
            next()
        });

        app.listen(CONF.appPortDev);
        console.log("server started. port :" + CONF.appPortDev);
    });

    app.configure('prod', 'stage', function() {
        app.use(express.static(__dirname + '/public', { maxAge: CONF.cacheTime }));
        app.use(express.errorHandler());
    });

    app.configure('stage', function() {
        // TODO: tests
        app.listen(CONF.appPortDef);
    });

    app.configure('prod', function() {
        app.listen(CONF.appPortProd);
    });

    console.log("devName: " + CONF.local.devName)
    routes(app, db);

});