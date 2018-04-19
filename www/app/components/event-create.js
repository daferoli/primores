import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
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
            console.log('IS VALID');
            this.setState({
                eventToCreate: newEvent,
                isDateValid: true
            });
        } else {
            console.log('NOT VALID');
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
        console.log(this.state.eventToCreate);
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
                <div>
                    <TextField
                        hintText="Date"
                        floatingLabelText="Date"
                        onChange={this.handleDateChange}
                    /><br />
                </div>
            );
        } else {
            return (
                <div>
                    <TextField
                        hintText="Date"
                        floatingLabelText="Date"
                        errorText="This date format is not valid"                    
                        onChange={this.handleDateChange}
                    /><br />
                </div>
            );
        }
    }

    render() {
        const topStyle = {
            paddingLeft:'25px',
            paddingTop: '15px'
        };
        const paperStyle = {
            width: '300px',
            minHeight: '200px',
            padding: '5px'
        };
        const createButtonStyle = {
            marginLeft: '130px'
        };
        const bStyle = {
            marginLeft: '80px',
            marginTop: '50px'
        };
        const buttonSpace = {
            paddingLeft: '25px'
        };
        if (this.state.createMode){
            return (
                <div style={topStyle}>
                    <Paper zDepth={3} style={paperStyle}>
                        <div>
                            <TextField
                                hintText="Name"
                                floatingLabelText="Name"
                                onChange={this.handleNameChange}
                            /><br />
                            {this.renderDateField()}
                            <TextField
                                hintText="Description"
                                floatingLabelText="Description"
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                onChange={this.handleDescriptionChange}
                            /><br />
                            <div className="row">
                                <div style={buttonSpace}>
                                    <RaisedButton primary={true} onClick={this.saveCreatedEvent}>
                                        Save
                                    </RaisedButton>
                                </div>
                                <div style={buttonSpace}>
                                    <RaisedButton secondary={true} onClick={this.cancelCreateMode}>
                                        cancel
                                    </RaisedButton>
                                </div>
                            </div>
                        </div>
                    </Paper> 
                </div>
            );
        } else {
            return (
                <div style={topStyle}>
                    <Paper zDepth={3} style={paperStyle} onClick={this.initiateCreateMode}>
                        <b className="col-xs-1" style={bStyle}>Create new Event</b> <br />
                        <FloatingActionButton mini={true} style={createButtonStyle}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Paper> 
                </div>             
            ); 
        }  
        
    }
}