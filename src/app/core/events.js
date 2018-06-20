import _ from 'lodash';
import moment from 'moment';
import {get, post} from './connection';

export function getEvents(eventUids) {
  let path = '/api/events';
  _.forEach(eventUids, (event) => {
    path += event;
  });
  return get(path)
  .then((eventArray) => {
    return convertDates(eventArray);
  });
}

export function createEvent(eventToCreate) {
  return post('/api/events', eventToCreate)
  .then((res) => {
    console.log('SUCCESS: ', res);
  })
  .catch((err) => {
    console.error('An error occurred: ', err);
  });
}

function convertDates(events) {
  _.each(events, (event) => {
    event.date = moment(event.date).format('MM/DD/YYYY HH:mm');
  });
  return events;
}
