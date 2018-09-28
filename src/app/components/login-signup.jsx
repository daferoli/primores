'use strict';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {attemptLogin} from '../core/userInfo';

export default class LoginDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            action: 'Login',
            formData: {
                email: null,
                password: null,
                confirm: null,
                passwordsMatch: true,
                errorMessage: null
            }
        }
    }

    handleClose = () => {
        this.state.formData.errorMessage = null;
        this.props.onClose();
    };

    handleLogin = () => {
        attemptLogin(this.state.formData.email, this.state.formData.password)
        .then((loginStatus) => {
            console.log('LOGIN STATUS: ', loginStatus);
            if(loginStatus.success) {
                this.props.onClose(loginStatus.loggedInUser);
            } else {
                this.setState({
                    errorMessage: 'Login Failed'
                });
            }
        });
    }

    switchAction = () => {
        if(this.state.action === 'Login') {
            this.setState({
                action: 'Signup'
            });
        } else {
            this.setState({
                action:'Login'
            });
        }
    }

    handleEmailChange = (event) => {
        var formData = this.state.formData;
        formData.email = event.target.value;
        this.setState({
            formData: formData
        });
    }

    handlePasswordChange = (event) => {
        var formData = this.state.formData;
        formData.password = event.target.value;
        formData.passwordsMatch = formData.password === formData.confirm;
        this.setState({
            formData: formData
        });
    }

    handleConfirmationChange = (event) => {
        var formData = this.state.formData;
        formData.confirm = event.target.value;
        formData.passwordsMatch = formData.password === formData.confirm;
        this.setState({
            formData: formData
        });
    }

    renderPasswordConfirmation = () => {
        if (this.state.action === 'Login') {
            return;
        } else {
            if(this.state.formData.passwordsMatch) {
                return (<TextField
                    autoFocus
                    margin="dense"
                    id="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    onChange={this.handleConfirmationChange}
                />);
            } else {
                return (<TextField
                    autoFocus
                    error
                    margin="dense"
                    id="passwordConfirm"
                    label="Passwords do not match"
                    type="password"
                    fullWidth
                    onChange={this.handleConfirmationChange}
                />);
            }
        }
    }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.state.action}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={this.handleEmailChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={this.handlePasswordChange}
                    />
                    {this.renderPasswordConfirmation()}
                    {this.state.errorMessage}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleLogin} color="primary">
                    {this.state.action === 'Login' ? 'Login' : 'Signup'}
                    </Button>
                    <Button onClick={this.switchAction} color="primary">
                    {this.state.action === 'Login' ? 'Signup Instead' : 'Login Instead'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
      }
  }
