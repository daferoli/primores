import _ from 'lodash';
import moment from 'moment';
import {request} from './connection';

export function getEvents(eventUids) {
  return request('/api/events',{
    type: 'GET',
    data: {
      uids: eventUids
    }
  })
  .then((eventArray) => {
    return convertDates(eventArray);
  });
}

export function createEvent(eventToCreate) {
  return request('/api/events',{
    type: 'POST',
    data: eventToCreate
  })
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
