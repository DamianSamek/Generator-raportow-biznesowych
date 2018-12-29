import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/employee' exact={true} component={EmployeeList}/>
              <Route path='/manager/employee/:id' component={EmployeeEdit}/>


          </Switch>
        </Router>
    );
  }
}

export default App;
