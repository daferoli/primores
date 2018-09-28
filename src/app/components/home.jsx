
import React, {Component} from 'react';
import EventRow from './event-row';
import TopBar from './top-bar';
import {getUserData} from '../core/userInfo';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            user: null,
            currentOffice: "Charlotte",
            currentRegion: "SouthEast"
        };
    }

    componentDidMount() {
        this.tryGetUserInfo()
        .then((changedState) => {
            console.log('what happens if I try that here? ');
            this.setState(changedState);
        });
    }

    changeOffice = (office, region) => {
        this.setState({
            currentOffice: office,
            currentRegion: region
        });
    }

    tryGetUserInfo = () => {
        var self = this;
        return getUserData()
        .then((userData) => {
            var changedState ={
                user: userData
            };
            changedState.currentOffice = null;
            changedState.currentRegion = null;
            for (var location in userData.activeLocations) {
                location = userData.activeLocations[location];
                if(location.level === 'office') {
                    changedState.currentOffice = location.name;
                }
                else if (location.level === 'region') {
                    changedState.currentRegion = location.name;
                }
            }
            self.setState(changedState);
            console.log('Set user Infomation');
            return changedState
        });
    }

    clearUserData = () => {
        //Reset to defaults
        this.setState({
            user: null,
            ccurrentOffice: "Charlotte",
            currentRegion: "SouthEast"
        })
    }

    render() {
        var homeStyle = {
            right: '15px',
        };
        console.log('Doin a render: ');
        if(this.state.user) {
            console.log(this.state.user.name);
        }
        return (
            <div>
                <TopBar currentOffice={this.state.currentOffice} user={this.state.user} reloadFunction={this.changeOffice} userLoggedIn={this.tryGetUserInfo} userLoggedOut={this.clearUserData}/>
                <div style={homeStyle}>
                    <h3>Upcoming Local Events:</h3>
                    <EventRow location={this.state.currentOffice}/>
                    <h3>Upcoming Regional Events:</h3>
                    <EventRow location={this.state.currentRegion}/>
                </div>
            </div>
        );
    }
}
