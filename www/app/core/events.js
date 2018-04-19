import falcorService from '../core/falcor';
import _ from 'lodash';
import moment from 'moment';

export function getEvents() {
    const falcor = falcorService();
    return falcor.getModel(['events','length'])
    .then((graph) => {
        const totalEvents = graph.events.length;
        const numberArray = Array.apply(null, {length: totalEvents}).map(Number.call, Number);
        return falcor.getModel(['events', numberArray,['name','description','date','office','attendees']])
        .then((res) => {
            const events = Object.values(_.omit(res.events, '$__path'));
            convertDates(events);
            return events;
        });
    });
}

export function createEvent(eventToCreate) {
    const falcor = falcorService();
    return falcor.callModel(['events', 'create'], [eventToCreate])
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