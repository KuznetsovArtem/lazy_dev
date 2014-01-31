/**
 * Created by Artem on 31.01.14.
 */

var Tools = function(data) {
    this.showMainPage = function(res, req, next) {
        req.render('index', data);
    }
}

module.exports.Tools = Tools;
