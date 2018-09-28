import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IdentityIcon from '@material-ui/icons/PermIdentity';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getLocations} from '../core/locations';
import LoginDialog from './login-signup';
import {logout} from '../core/userInfo';

const styles = {
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};
class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            officeAnchorEl: null,
            userAnchorEl: null,
            officeList: [],
            parentLocations:[],
            loginOpen: false
        };
    }

    componentDidMount() {
        getLocations()
        .then((allLocations) => {
            this.setState({
                officeList: allLocations.filter((location) => location.isOffice),
                parentLocations: allLocations.filter((location) => !location.isOffice)
            })
        });
    }

    handleClickOfficeMenuIcon = (event) => {
        this.setState({ officeAnchorEl: event.currentTarget });
    };

    handleClickOfficeMenuItem = (event, index) => {
        this.setState({
            officeAnchorEl: null
        });

        //This will be 'My Location' since we put it first in the menu if the user is logged in
        if (Boolean(this.props.user) && index === null) {
            var changedOffice;
            var changedRegion;
            for (var location in this.props.user.activeLocations) {
                location = this.props.user.activeLocations[location];
                if(location.level === 'office') {
                    changedOffice = location.name;
                }
                else if (location.level === 'region') {
                    changedRegion = location.name;
                }
            }
            this.props.reloadFunction(changedOffice, changedRegion);
        } else {
            this.props.reloadFunction(this.state.officeList[index].name, this.state.officeList[index].parentLocation);
        }
    };

    handleCloseOfficeMenu = () => {
        this.setState({ officeAnchorEl: null });
    };

    handleCloseLogin = (user) => {
        this.setState({
            loginOpen: false
        });
        this.props.userLoggedIn();
    }

    handleOpenLogin = () => {
        this.setState({loginOpen: true});
    }

    handleClickUserMenuButton = (event) => {
        this.setState({ userAnchorEl: event.currentTarget});
    }

    handleCloseUserMenu = () => {
        this.setState({ userAnchorEl: null});
    }

    handleClickUserLogout = () => {
        logout();
        this.props.userLoggedOut();
        this.setState({
            userAnchorEl: null
        });
    }

    //This will create a location in the menu called "my office" for a users custom office/region location
    renderUserOffice = () => {
        if(this.props.user) {
            return (
                <MenuItem
                    key='user-location'
                    onClick={(event) => this.handleClickOfficeMenuItem(event, null)}
                >
                My Office
                </MenuItem>
            );
        }
    }

    renderUserOrLogin() {
        //If a user is logged in
        if(this.props.user) {
            return (
                <div>
                    <Button color='inherit' onClick={this.handleClickUserMenuButton}>
                        <IdentityIcon/>
                        {this.props.user.name}
                    </Button>
                    <Menu
                        id='user-menu'
                        anchorEl={this.state.userAnchorEl}
                        open={Boolean(this.state.userAnchorEl)}
                        onClose={this.handleCloseUserMenu}
                    >
                        <MenuItem
                            key='logout-User'
                            onClick={this.handleClickUserLogout}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            );
        } else {
            return (
                <div>
                    <Button color="inherit" onClick={this.handleOpenLogin}>Login / Signup</Button>
                    <LoginDialog
                        open={this.state.loginOpen}
                        onClose={this.handleCloseLogin}
                    />
                </div>
            );
        }
    }

    render(){
        const classes= this.props.classes;
        return (
            <div>
                <AppBar className={classes.flex} position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClickOfficeMenuIcon}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="office-menu"
                            anchorEl={this.state.officeAnchorEl}
                            open={Boolean(this.state.officeAnchorEl)}
                            onClose={this.handleCloseOfficeMenu}
                        >
                            {this.renderUserOffice()}
                            {this.state.officeList.map((office, index) => (
                                <MenuItem
                                    key = {office.name + "MenuItem"}
                                    onClick={(event) => this.handleClickOfficeMenuItem(event, index)}
                                >
                                    {office.name}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.props.currentOffice}
                        </Typography>
                        {this.renderUserOrLogin()}
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(styles)(TopBar);
