import React, { Component } from "react";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Event from './event';
import EventCreator from './event-create';
import {getEventsForLocation} from '../core/events';



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

    reloadEvents = () => {
        var self = this;
        getEventsForLocation(this.state.currentLocation)
        .then((events) => {
            self.setState({
                events: events
            });
        });
    }

    render(){
        var flexContainer = {
            display: 'flex',
            flexDirection: 'row',
            padding: '5px',
            overflowX:'auto'
        };
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <List style={flexContainer}>
                            {this.state.events.map((event) => {
                                return <Event key={event.uid} event={event}/>
                            })}
                        </List>
                    </Grid>

                    <Grid item xs={3}>
                        <EventCreator reloadFunction={this.reloadEvents} location={this.state.currentLocation}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
