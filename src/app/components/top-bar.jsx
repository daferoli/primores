import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
        console.log(props);
        this.state = {
            currentOffice: props.currentOffice,
        };
        this.handleOfficeChange = this.handleOfficeChange.bind(this);
    }

    handleOfficeChange(event) {
        //Signal to parent that office has changed
    }

    render(){
        const classes= this.props.classes;
        return (
            <div>
                <AppBar className={classes.menuButton} position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
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
