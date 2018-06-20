
import React, {Component} from 'react';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import {getEvents} from '../core/events';
import Event from './event';
import EventCreator from './event-create';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            events: []
        };
        this.reloadEvents = this.reloadEvents.bind(this);
    }

    componentDidMount() {
        var self = this;
        getEvents()
        .then((events) => {
            self.setState({
                events: events
            });
        });
    }

    reloadEvents() {
        var self = this;
        getEvents()
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
        console.log('RENDERING HOME');
        return (
             <div style={homeStyle}>
                <h2>Your Office: <b>Charlotte</b></h2>
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
