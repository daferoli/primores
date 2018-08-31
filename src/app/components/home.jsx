
import React, {Component} from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {getEventsForOffice} from '../core/events';
import Event from './event';
import EventCreator from './event-create';
import TopBar from './top-bar';

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
        getEventsForOffice(this.state.currentOffice)
        .then((events) => {

            self.setState({
                events: events
            });
        });
    }

    reloadEvents(changeOffice) {
        if(changeOffice) {
            this.setState({
                currentOffice: changeOffice
            });
        }
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
            padding: '5px',
            overflowX:'auto'
        };
        var creatorContainer = {
            right:0
        };
        var homeStyle = {
            right: '15px',
        };
        return (
            <div>
                <TopBar reloadFunction={this.reloadEvents} currentOffice={this.state.currentOffice}/>
                <h3>Upcoming Local Events:</h3>
                <div style={homeStyle}>
                    <Grid container spacing={24}>
                        <Grid item xs={9}>
                            <List style={flexContainer}>
                                {this.state.events.map((event) => {
                                    console.log(event.uid);
                                    return <Event key={event.uid} event={event}/>
                                })}
                            </List>
                        </Grid>

                        <Grid item xs={3}>
                            <EventCreator reloadFunction={this.reloadEvents} style={creatorContainer} office={this.state.currentOffice}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
