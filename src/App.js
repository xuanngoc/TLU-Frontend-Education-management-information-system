import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from './history';

import Header from './components/header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav'
import SubjectManagement from './components/Subject/SubjectManagement';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user: {},
      store: null
    }

    //this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.storeCollector = this.storeCollector.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
  }


  getUserInfo = (store) => {
    // fetch user info
    fetch('http://localhost:8080/api/v1/user', {
      headers: {
        'Authorization': store.token
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => this.setState({
      user: data
    }))
  }

  storeCollector() {
    const store = JSON.parse(localStorage.getItem('login'));
    if (store && store.login !== null) {
      this.setState({
        login: true,
        store: store
      })
      this.getUserInfo(store);
    };
  }

  onRedirect = (path) => {
    history.replace(path);
  }

  onLogout = () => {
    localStorage.removeItem('login');
    this.setState({
      login: false,
      store: null
    })
  }

  componentDidMount() {
    this.storeCollector();
  }

  render() {
    const {user, login} = this.state;
    return (
      <Router history={history}>
        {
          login === false ? 
          <Login onLogIn={this.onLoginIn} onLoginSuccess={this.onLoginSuccess} onRedirect={this.onRedirect} storeCollection={this.storeCollector} />
          :
          <div>
            <Header userFullName={user.fullname} onLogout={this.onLogout} />} 
            <div style={{'display': 'flex'}}>
            <Nav style={{'flex-grow': '2'}} /> }
              <Switch>
                <Route exact path="/">
                  <SubjectManagement />
                </Route> 
                <Route path='/quan-ly-hoc-phan'>
                  <SubjectManagement />
                </Route>
              </Switch>
            </div>
          </div>
        }
        
      </Router>
    )
  }
}

export default App;