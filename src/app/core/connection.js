'use strict'
import * as env from 'env-var';
import 'whatwg-fetch';

const baseUrl = env.get('API_URL', 'http://localhost:9090').asString();

export function get(path, options = {}) {
    options.method = 'GET';
    return callWithJsonResponse(path, options);
};

export function post(path, data, options = {}) {
    options.method = 'POST';
    options.body = JSON.stringify(data);
    return callWithJsonResponse(path, options);
}

export function put(path, data, options = {}) {
    options.method = 'PUT';
    options.body = JSON.stringify(data);
    return callWithJsonResponse(path, options);
}

export function remove(path, data, options = {}) {
    options.method = 'DELETE';
    options.body = JSON.stringify(data);
    return callWithJsonResponse(path, options);
}

function callWithJsonResponse(path, options) {

    return fetch(baseUrl + path, setStandardHeaders(options))
    .then((response) => {
        if(response.status >= 400) {
            throw new Error(response.status +' status received for path: ' + path);
        }
        return response.json();
    })
    .catch((err) => {
        console.error('There was an error trying to call path: ' + path + "\nerror: " + err);
        throw(err);
    });
}

function setStandardHeaders(options) {
  options.headers = options.headers || {};
  options.headers['Content-Type'] = 'application/json; charset=utf-8';
  options.headers['x-access-token'] = localStorage.getItem('accessToken'); //This gets the JWT access token if it's available.
  return options;
}
