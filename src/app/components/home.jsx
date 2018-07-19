
import React, {Component} from 'react';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {getEventsForOffice} from '../core/events';
import Event from './event';
import EventCreator from './event-create';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            currentOffice:"Charlotte",
            events: []
        };
        this.reloadEvents = this.reloadEvents.bind(this);
    }

    componentDidMount() {
        var self = this;
        console.log('gettingEvents');
        getEventsForOffice(this.state.currentOffice)
        .then((events) => {
            console.log('GOT EVENTS:', events);

            self.setState({
                events: events
            });
        });
    }

    reloadEvents() {
        var self = this;
        getEventsForOffice(this.state.currentOffice)
        .then((events) => {
            self.setState({
                events: events
            });
        });
    }

    render() {
        var flexContainer = {
            display: 'flex',
            flexDirection: 'row',
            padding: '10px',
            width: '75%',
            overflowX:'auto'
        };
        const creatorContainer = {
            right:0
        };
        const homeStyle = {
            paddingTop: '10px',
            paddingLeft: '15px'
        };
        return (
             <div style={homeStyle}>
                <h2>Your Office: <b>{this.state.currentOffice}</b></h2>
                <h3>Upcoming Events:</h3>
                <div className="row">
                    <List style={flexContainer}>
                        {this.state.events.map((event) => (
                            <Event key={event.id} event={event}/>
                        ))}
                    </List>
                    <EventCreator reloadFunction={this.reloadEvents} style={creatorContainer}/>
                </div>
             </div>
        );
    }
}
