import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class Event extends Component {
    render() {
        const event = this.props.event;
        const topStyle = {
            paddingRight:'25px'
        };
        const paperStyle = {
            width: '300px',
            padding: '5px'
        };
        if (this.isLoaded){
            return(
                <h2>Loading...</h2>
            );
        } else {
            return (
                <div style={topStyle}>
                    <Paper zDepth={3} style={paperStyle}>
                        <h3>{event.name ? event.name : "Event"}</h3>
                        <h4>{event.date ? event.date : "Eventually"}</h4>
                        <p>{event.description ? event.description : ""}</p>
                        <Divider inset={true} />
                        <h3>Attendees</h3>
                        <List>
                            {event.attendees ? event.attendees.map((attendee) => (
                                <ListItem key={attendee.id} primaryText={attendee.name}/>
                            )) : <ListItem key={0}>No one signed up yet</ListItem>}
                        </List>
                    </Paper> 
                </div> 
            );
        }
        
    }
}