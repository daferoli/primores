import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {createEvent} from '../core/events';
import moment from 'moment';

export default class EventCreator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createMode: false,
            eventToCreate: {
                name: "",
                description: "",
                date: "",
                location: props.location
            },
            isDateValid: true
        };
        this.initiateCreateMode = this.initiateCreateMode.bind(this);
        this.cancelCreateMode = this.cancelCreateMode.bind(this);
        this.saveCreatedEvent = this.saveCreatedEvent.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.renderDateField = this.renderDateField.bind(this);
    }

    handleNameChange(event) {
        var newEvent = this.state.eventToCreate;
        newEvent.name = event.target.value;
        this.setState({
            eventToCreate: newEvent
        });
    }

    handleDescriptionChange(event) {
        var newEvent = this.state.eventToCreate;
        newEvent.description = event.target.value;
        this.setState({
            eventToCreate: newEvent
        });
    }

    handleDateChange(event) {
        var newEvent = this.state.eventToCreate;
        newEvent.date = event.target.value;
        if(moment(event.target.value).isValid()) {
            this.setState({
                eventToCreate: newEvent,
                isDateValid: true
            });
        } else {
            this.setState({
                eventToCreate: newEvent,
                isDateValid: false
            });
        }
    }

    initiateCreateMode() {
        this.setState({
            createMode: true
        });
    }

    cancelCreateMode() {
        this.setState({
            createMode: false
        });
    }

    saveCreatedEvent(event) {
        event.preventDefault();
        this.state.eventToCreate.date = moment(this.state.eventToCreate.date).toISOString();
        return createEvent(this.state.eventToCreate)
        .then(() => {
            this.props.reloadFunction();
            this.setState({
                createMode: false,
                eventToCreate: {
                    name: "",
                    description: "",
                    date: "",
                }
            });
        });
    }

    renderDateField() {
        if(this.state.isDateValid) {
            return (
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="date"
                        label="Date"
                        floatinglabeltext="Date"
                        onChange={this.handleDateChange}
                    />
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error
                        id="date"
                        label="Date is not valid"
                        onChange={this.handleDateChange}
                    />
                </Grid>
            );
        }
    }

    render() {
        const topStyle = {
            paddingLeft:'25px',
            paddingTop: '15px'
        };
        const cardStyle = {
            width: '300px',
            minHeight: '200px',
            padding: '5px'
        };
        const bStyle = {
            paddingLeft: '65px'
        };
        const buttonSpace = {
            paddingLeft: '65px'
        };
        if (this.state.createMode){
            return (
                <div style={topStyle}>
                    <Card style={cardStyle}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="eventName"
                                    label="Name"
                                    onChange={this.handleNameChange}
                                />
                            </Grid>
                            {this.renderDateField()}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="eventId"
                                    label="Description"
                                    multiline={true}
                                    rows={2}
                                    rowsMax={4}
                                    onChange={this.handleDescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant='raised' color="primary" onClick={this.saveCreatedEvent}>
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={4} >
                                <Button variant='raised' color="secondary" onClick={this.cancelCreateMode}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            );
        } else {
            return (
                <div style={topStyle}>
                    <Card style={cardStyle} onClick={this.initiateCreateMode}>
                        <CardContent>
                            <b style={bStyle}>Create New Event</b>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                            <Button variant='fab' mini={true} >
                                <AddIcon />
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            );
        }

    }
}
