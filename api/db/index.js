'use strict';

var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var Collection = require('mongodb').Collection;

var MONGO_URL = 'mongodb://localhost:27017/PRIMORES';
var RETRY_INTERVAL = 10000;

var collectionFns = Object.keys(Collection.prototype);

// We export this so developers can access properties such as mongodb.ObjectID
exports.mongodb = require('mongodb');

exports.db = new Promise(function(resolve) {
    attemptConnection(resolve);
});

// Returns an object that can be used just like a Mongo Collection object.
// The results of each collection function will be a BLUEBIRD promise.
exports.collection = function(collectionName) {

    var collPromise = exports.db.call('collection', collectionName);

    var res = {};
    collectionFns.forEach(function(fnName) {
        res[fnName] = function() {
            var args = arguments;
            return collPromise.then(function(collection) {
                return collection[fnName].apply(collection, args);
            });
        };
    });

    return res;
};


// Will call onConnect(database) only after successfully connecting to the database
function attemptConnection(onConnect) {
    Promise.resolve(MongoClient.connect(MONGO_URL))
        .then(onConnect)
        .catch(function(err) {
            console.log('Error connecting to mongo, trying again later', err.stack || err);
            Promise.delay(RETRY_INTERVAL).then(function() {
                attemptConnection(onConnect);
            });
        });
}
