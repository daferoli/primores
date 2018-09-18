import _ from 'lodash';
import {get} from './connection';

export function getLocations(locationName) {
  let path = '/api/locations/';
  return get(path)
  .catch((err) => {
    console.error('An error happened', err);
  });
}
