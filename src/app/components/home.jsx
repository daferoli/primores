
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

    changeOffice = (office) => {
        this.setState({
            currentOffice: office.name,
            currentRegion: office.parentLocation
        });
    }

    render() {
        var homeStyle = {
            right: '15px',
        };
        return (
            <div>
                <TopBar currentOffice={this.state.currentOffice} reloadFunction={this.changeOffice}/>
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
