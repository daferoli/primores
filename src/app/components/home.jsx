
import React, {Component} from 'react';
import EventRow from './event-row';
import TopBar from './top-bar';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            currentOffice: "Charlotte",
            currentRegion: "SouthEast"
        };
    }

    render() {
        var homeStyle = {
            right: '15px',
        };
        return (
            <div>
                <TopBar currentOffice={this.state.currentOffice}/>
                <h3>Upcoming Local Events:</h3>
                <div style={homeStyle}>
                    <EventRow location={this.state.currentOffice}/>
                    <EventRow location={this.state.currentRegion}/>
                </div>
            </div>
        );
    }
}
