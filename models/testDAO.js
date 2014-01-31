function TestDAO(db) {
    "use strict";

    if(false === (this instanceof TestDAO)) {
        console.warn("Warning: TestDAO constructor called w/out 'new' operator")
    }

    var dbData = db.collection('test');

    this.addSomeData = function(data, callback) {
        console.log('try to add data');
        dbData.insert(data, function(err, inserted) {
            if (err) return callback(err);

            console.log('inserted:')
            console.log(inserted)
            return callback(null, inserted[0]);
        });

    }

    this.getAllData = function(callback) {
        console.log('try to get all data')

        var query = {};
        var projection = {
            _id: 0
        };

        dbData.find(query, projection).toArray(function(err, data) {
            if (err) return callback(err, null);
            callback(err, data);
        });
    }
}

module.exports.TestDAO = TestDAO