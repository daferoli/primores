'use strict';
import {get, post} from './connection';

//TODO: Right now we assume all failed calls are a result of a 401. we need to add extra error handling here for a more generic case.

export function getUserData()
{
    //No token means we're not logged in. return undefined, so we know theres no data.
    if(!localStorage.getItem('accessToken')) {
        return Promise.resolve();
    } else {
        return get('/api/users/me')
        .catch(() => {
            return;
        });
    }
}

export function attemptLogin(email, password) {
    return post('/login', {
        email,
        password
    })
    .then((loginStatus) => {
        if(loginStatus.success) {
            localStorage.setItem('accessToken', loginStatus.token);
        }
        return loginStatus;
    })
    .catch(() => {
        return {
            success:false
        };
    });
}

//NOTE: This does not invalidate the token, just stops the browser from tracking it.
export function logout() {
    localStorage.removeItem('accessToken');
}
