import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route exact path="/" render={() => (

                      <Redirect to="/employee"/>

              )}/>
            <Route path='/employee' exact={true} component={EmployeeList}/>
              <Route path='/employee/:id' component={EmployeeEdit}/>


          </Switch>
        </Router>
    );
  }
}

export default App;
