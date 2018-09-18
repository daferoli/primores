import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getLocations} from '../core/locations';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            currentOffice: props.currentOffice,
            officeList: [],
            parentLocations:[]
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

    handleClickMenuIcon = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({anchorEl: null, currentOffice: this.state.officeList[index].name});
        this.props.reloadFunction(this.state.officeList[index]);
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render(){
        const classes= this.props.classes;
        return (
            <div>
                <AppBar className={classes.root} position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClickMenuIcon}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.state.officeList.map((office, index) => (
                                <MenuItem
                                key = {office.name + "MenuItem"}
                                onClick={event => this.handleMenuItemClick(event, index)}>
                                    {office.name}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.state.currentOffice}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(styles)(TopBar);
