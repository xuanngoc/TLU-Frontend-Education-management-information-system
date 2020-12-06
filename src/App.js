import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from './history';

import Header from './components/header/Header';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav'
import SubjectManagement from './components/Subject/SubjectManagement';
import SubjectByDepartment from './components/Subject/SubjectByDepartment';
import HOST from './Host';
import TeacherManagement from './components/Teacher/TeacherManagement';
import DepartmentManagement from './components/Department/DepartmentManagement';
import DetailDepartment from './components/Department/DetailDepartment';
import MajorManagement from './components/Major/MajorManagement';
import SchoolYear from './components/SchoolYear/SchoolYear';
import EducationProgram from './components/EducationProgram/EducationProgram';
import SubjectOutline from './components/Subject/SubjectOutline';
import FormInsertSubjectOutline from './components/Subject/FormInsertSubjectOutline';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user: {},
      store: null,
      maBoMon: ""
    }

    //this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.storeCollector = this.storeCollector.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
  }


  getUserInfo = (store) => {
    // fetch user info
    fetch(HOST + '/user', {
      headers: {
        'Authorization': store.token
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      
      this.setState({
        user: data
      });

      this.getMaBoMon(store);
    })

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

  getMaBoMon = (store) => {
    console.log(`${HOST}/giao-vien/ma-bo-mon?userId=${this.state.user.userId}`)
    fetch(`${HOST}/giao-vien/ma-bo-mon?userId=${this.state.user.userId}`, {
      headers : {
          "Authorization": store.token
      }
    })
    .then(response => response.text())
    .then(data => {
      this.setState({
        maBoMon: data
      })
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
            <Header user={user} onLogout={this.onLogout} />
            <div className="row" style={{margin: "0"}}>
            <Nav user={user} /> 
              <Switch>
                <Route exact path="/">
                  <div className="col-10">
                    Just home
                  </div>
                </Route> 
                <Route exact path='/quan-ly-hoc-phan'>
                  <SubjectManagement store={this.state.store}/>
                </Route>
                <Route path='/quan-ly-giao-vien'>
                  <TeacherManagement store={this.state.store}/>
                </Route>
                <Route exact path='/quan-ly-bo-mon'>
                  <DepartmentManagement store={this.state.store}/>
                </Route>
                <Route path={`/quan-ly-bo-mon/:maBoMon`}>
                  <DetailDepartment store={this.state.store} />
                </Route>

                <Route path={`/quan-ly-nghanh`}>
                  <MajorManagement store={this.state.store} />
                </Route>

                <Route path={`/quan-ly-nam-hoc`}>
                  <SchoolYear store={this.state.store} />
                </Route>

                <Route path={`/quan-ly-chuong-trinh-dao-tao`}>
                  <EducationProgram store={this.state.store} />
                </Route>

                <Route exact path={`/quan-ly-truc-thuoc`}>
                  <SubjectByDepartment store={this.state.store} maBoMon={this.state.maBoMon} />
                </Route>

                <Route exact path={`/quan-ly-hoc-phan/:maHocPhan`}>
                  <SubjectOutline store={this.state.store} />
                </Route>

                <Route  path={`/quan-ly-hoc-phan/:maHocPhan/them`}>
                  <FormInsertSubjectOutline store={this.state.store} />
                </Route>

                <Route  path={`/quan-ly-de-cuong-chi-tiet`}>
                  <SubjectOutline store={this.state.store} maBoMon={this.state.maBoMon} />
                </Route>

                <Route  path={`/quan-ly-de-cuong/:maNamHoc/:maMon/them`}>
                  <FormInsertSubjectOutline store={this.state.store} />
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