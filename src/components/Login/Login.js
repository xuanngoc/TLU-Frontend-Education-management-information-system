import React, { Component } from 'react';
import HOST from '../../Host';
//import './login.css';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginError: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    onSubmitLogin = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(HOST + '/login', {
            headers: new Headers( {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),

            method: 'POST',
            body: JSON.stringify(data)
        })
        //mode: 'no-cors',

        .then((res) => {
            
            if (res.status === 200) {
                return res.json();           
            } else {
                this.setState({
                    loginError: true
                })
            }
            
        })
        .then(data => {
            localStorage.setItem('login', JSON.stringify({
                login: true,
                token: `${data.tokenType} ${data.accessToken}`
            }))
            //console.log(data);
            this.props.storeCollection();
            //this.props.onLoginSuccess();
            this.props.onRedirect('/');
            
        })
        .catch(error => console.log(error));
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    render() {
        const {username, password, loginError} = this.state;
        return (
            <div className="row align-items-center vh-100 ">
                
                <form className="col-4 offset-4 bg-info p-5" onSubmit={this.onSubmitLogin}>
                    <div className="form-group mt-5">
                        <label htmlFor="exampleInputEmail1">Tài khoản</label>
                        <input type="text" className="form-control" id="username" name="username" onChange={this.onInputChange} value={username}/>
                        
                    </div>
                    <div className="form-group mt-2 mb-5">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={this.onInputChange} value={password} />
                    </div>
                    {loginError ? <p>Tài khoản hoặc mật khẩu không chính xác</p> : null}
                    <button type="submit" className="btn btn-primary">Đăng nhập</button>
                </form>      
            </div>
        )
    }
}
