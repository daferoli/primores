import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class Event extends Component {
    render() {
        const event = this.props.event;
        const topStyle = {
            paddingRight:'25px'
        };
        const cardStyle = {
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
                    <Card style={cardStyle}>
                        <CardContent>
                            <h3>{event.name || "Event"}</h3>
                            <h4>{event.date || "Eventually"}</h4>
                            <p>{event.description || ""}</p>
                            <Divider inset={true} />
                            <h3>Attendees</h3>
                            <List>
                                {event.attendees && event.attendees.size > 0 ? event.attendees.map((attendee) =>
                                    <ListItem key={attendee.uid} primarytext={attendee.name}/>
                                ): <ListItem key="0">No one has signed up yet</ListItem>}
                            </List>
                        </CardContent>
                    </Card>
                </div>
            );
        }

    }
}
