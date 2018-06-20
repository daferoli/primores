'use strict'
import * as env from 'env-var';

const baseUrl = env.get('API_URL').asString();
if(!baseUrl) {
  baseUrl = 'http://localhost:9090';
}

export function get(path, options = {}) {
  options.type = 'GET';
  return callWithJsonResponse(path, options);
};

export function post(path, data, options = {}) {
  options.type = 'POST';
  options.body = JSON.stringify(data);
  return callWithJsonResponse(path, options);
}

export function put(path, data, options = {}) {
  options.type = 'PUT';
  options.body = JSON.stringify(data);
  return callWithJsonResponse(path, options);
}

export function remove(path, data, options = {}) {
  options.type = 'DELETE';
  options.body = JSON.stringify(data);
  return callWithJsonResponse(path, options);
}

function callWithJsonResponse(path, options) {
  return fetch(baseUrl + path, setStandardHeaders(options))
  .then((response) => {
    return response.json();
  })
  .catch((err) => {
    console.error('There was an error trying to call path: ' + path + "\nerror: " + err);
  });
}

function setStandardHeaders(options) {
  options.headers = options.headers || {};
  options.headers['Content-Type'] = 'application/json';
  return options;
}
