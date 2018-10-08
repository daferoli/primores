import React, { Component } from "react";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Event from './event';
import EventCreator from './event-create';
import {getEventsForLocation} from '../core/events';
import _ from 'lodash';



export default class EventRow extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentLocation: props.location,
            events:[]
        }
        this.reloadEvents();
    }

    componentDidMount() {
        var self = this;
        getEventsForLocation(this.state.currentLocation)
        .then((events) => {
            self.setState({
                events: events
            });
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location) {
            var self = this;
            getEventsForLocation(this.props.location)
            .then((events) => {
                self.setState({
                    currentLocation: this.props.location,
                    events: events
                });
            });
        }
    }

    //NOTE: For now we will only update attendees. When event updating is added, we will need to loop over the updated fields
    updateEventInfo = (updatedEvent) => {
        const currentEvents = this.state.events;
        const existingEvent = _.find(currentEvents, {uid: updatedEvent.uid});
        existingEvent.attendees = updatedEvent.attendees;

        this.setState({
            events: currentEvents
        });
    }

    reloadEvents = () => {
        var self = this;
        getEventsForLocation(this.state.currentLocation)
        .then((events) => {
            self.setState({
                events: events
            });
        });
    }

    userIsLead = () => {
        return this.props.user && _.find(this.props.user.activeLocations, (location) => {
            return location.name === this.state.currentLocation && location.status === 'lead';
        })
    }

    renderEventCreator = () => {
        if(this.userIsLead()) {
            return (
                <Grid item xs={3}>
                    <EventCreator reloadFunction={this.reloadEvents} location={this.state.currentLocation}/>
                </Grid>
            );
        }
    }

    render(){
        var flexContainer = {
            display: 'flex',
            flexDirection: 'row',
            padding: '5px',
            overflowX:'auto'
        };
        var baseStyle = {
            'minHeight': '300px'
        };
        // if the user cannot create an event, we want the list to take the full width
        var listSpacing = this.userIsLead() ? 9 : 12;
        return (
            <div style={baseStyle}>
                <Grid container spacing={24}>
                    <Grid item xs={listSpacing}>
                        <List style={flexContainer}>
                            {this.state.events.map((event) => {
                                return <Event key={event.uid} event={event} user={this.props.user} notifyUpdate={this.updateEventInfo}/>
                            })}
                        </List>
                    </Grid>
                    {this.renderEventCreator()}
                </Grid>
            </div>
        );
    }
}
