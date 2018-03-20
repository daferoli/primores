const R = require('ramda');

exports.omitId = R.omit(['_id']);

exports.isArray = R.is(Array);

exports.isString = R.is(String);

exports.omitIdsFromArray = R.map(exports.omitId);
