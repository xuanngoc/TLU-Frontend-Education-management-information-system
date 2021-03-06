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
            <div>
                
                <div className="row align-items-center vh-100 " style={{margin: "0", backgroundImage: "url(bg.jpg)"}} >
    
                    <div className="col-md-5 "></div>
                    <form className="col-12 col-md-3 p-5 rounded" style={{background: "white", opacity: "0.95"}} onSubmit={this.onSubmitLogin}>
                        <div className="row justify-content-center">
                            <img id="logo1" className='col-12 mt-5' src="/LogoTLU.jpg" alt='Logo Thang Long university' />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="username">Tài khoản</label>
                            <input type="text" className="form-control"  name="username" onChange={this.onInputChange} value={username}/>
                            
                        </div>

                        <div className="form-group mt-2 mb-5">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" className="form-control" name="password" onChange={this.onInputChange} value={password} />
                        </div>

                        {loginError ? <p className="text-danger">Tài khoản hoặc mật khẩu không chính xác</p> : null}

                        <div className="row justify-content-center">
                            <button type="submit" className="btn" style={{background: "#6c5ce7", color: "#fff"}}>Đăng nhập</button>
                        </div>
                        
                    </form>
                </div>
                      
            </div>
        )
    }
}
