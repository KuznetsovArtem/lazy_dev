localConf = require('./localConfig').config || {};

config = {
    local: localConf,
    viewsFolder: __dirname + '/views',
    'viewEngine': 'html',
    //
    sessionSecret: 'Secret',
    //
    cacheTime: 31104000000, // 1000 * 60 * 60 * 24 * 30 * 12
    //
    appPortDef: 3000,
    appPortDev: 3000, // TODO: get port from console env
    appPortProd: 80

};

exports.config = config;