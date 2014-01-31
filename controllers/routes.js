/**
 * Created by askuznetsov on 1/30/14.
 */

// main routes fx
var Tools = require('./tools.js').Tools;

module.exports = exports = function(app, db) {

    var tools = new Tools({});

    app.all('/index', tools.showMainPage);
    app.get('/:query?', function(req, res, next) {
        if(req.params.query === 'next') return next();
        res.send('Seems ok' + ' ' + (req.params.query||''));
    });
    app.get('/:q', function(req, res) {
       res.send('OK');
    });
}