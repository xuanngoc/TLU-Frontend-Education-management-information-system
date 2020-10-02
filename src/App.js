import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/header/Header';
import Nav from './components/Nav/Nav'
import SubjectManagement from './components/Subject/SubjectManagement';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div style={{'display': 'flex'}}>
            <Nav style={{'flex-grow': '2'}} />
            <Switch>
            <Route exact path="/">
              <SubjectManagement />
            </Route>
            <Route path='/quan-ly-hoc-phan'>
              <SubjectManagement />
            </Route>
            </Switch>
          </div>
          
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

export default App;