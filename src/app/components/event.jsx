import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import {modifyEventAttendees} from '../core/events'

export default class Event extends Component {

    constructor(props) {
        super(props);
    }

    isUserSignedUp = () => {
        if(!this.props.user) {
            return false;
        }
        return Boolean(_.find(this.props.event.attendees, { userUid: this.props.user.uid }));
    }

    canUserSignUp = () => {
        if(!this.props.user) {
            return false;
        }
        //Check users locations. If they have the location and are either active status or lead status, return true.
        return Boolean(_.find(this.props.user.activeLocations, (loc) => {
            return loc.name === this.props.event.location && (loc.status == "lead" || loc.status == "active");
        }));
    }

    addAttendance = () => {
        return modifyEventAttendees(this.props.event.uid, 'add', {
            userUid: this.props.user.uid,
            email: this.props.user.email
        })
        .then((updatedAttendees) => {
            this.props.notifyUpdate({
                uid: this.props.event.uid,
                attendees: updatedAttendees
            });
        });
    }

    removeAttendance = () => {
        return modifyEventAttendees(this.props.event.uid, 'remove', {
            userUid: this.props.user.uid,
            email: this.props.user.email
        })
        .then((updatedAttendees) => {
            this.props.notifyUpdate({
                uid: this.props.event.uid,
                attendees: updatedAttendees
            });
        });
    }

    showAttendanceButton = () => {
        if(this.isUserSignedUp()) {
            // User is already on the list. Show remove button.
            return (
                <Button color='secondary' onClick={this.removeAttendance}>
                    Can't Make the Event?
                </Button>
            );
        } else if (this.canUserSignUp()) {
            // User is listed as active in the office. Show signup button.
            return (
                <Button color='primary' onClick={this.addAttendance}>
                SignUp for This Event
                </Button>
            );
        }
        // else show no button.
    }

    render() {
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
                            <h3>{this.props.event.name || "Event"}</h3>
                            <h4>{this.props.event.date || "Eventually"}</h4>
                            <p>{this.props.event.description || ""}</p>
                            <Divider inset={true} />
                            <h3>Attendees</h3>
                            <List>
                                {this.props.event.attendees && this.props.event.attendees.length > 0 ? this.props.event.attendees.map((attendee) =>
                                    <ListItem key={this.props.event.uid + '_' + attendee.userUid}>{attendee.email}</ListItem>
                                ): <ListItem key="0">No one has signed up yet</ListItem>}
                            </List>
                        </CardContent>
                        <CardActions>
                            {this.showAttendanceButton()}
                        </CardActions>
                    </Card>
                </div>
            );
        }

    }
}
