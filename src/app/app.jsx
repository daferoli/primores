'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/home';

export default class App extends Component {
  render(){
    return (
      <MuiThemeProvider>
        <Home />
      </MuiThemeProvider>
    );
  }
}
 

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
