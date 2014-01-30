var express = require('express')
    , app  = express()
    , cons = require('consolidate')
    , MongoClient = require('mongodb').MongoClient
    , routes = require('./controllers/routes')
    , CONF = require('./config').config;

MongoClient.connect('mongodb://localhost:27017/lazy_dev', function(err, db) {
    "use strict";
    if (err) throw err

    app.configure(function() {
        // template stuff
        app.engine('html', cons.swig);
        app.set('view engine', CONF.viewEngine);
        app.set('views', CONF.viewsFolder);
        //
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        //
        routes(app, db);
    });
    app.configure('dev', function() {
        app.use(express.static(__dirname + '/public'));
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        app.use(function() {
            console.log('dev fx');
//            console.log(arguments);
        });

        app.enable('case sensitive routes');

        app.listen(CONF.appPortDev);
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
});