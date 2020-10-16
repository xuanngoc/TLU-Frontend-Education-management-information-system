import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className='row'>
                <img id="logo" className='col-2 ml-5' src="./LogoTLU.jpg" alt='Logo Thang Long university' />
                <h3 id='system-name' className='col-8 text-center align-self-center'>Hệ thống quản lý chương trình đào tạo</h3>
                <div id='account-info' className='col-2 text-center align-self-center'>
                    
                    <div>
                        Hello <strong>{this.props.userFullName}</strong>
                    </div>
                    <div className="mt-2">
                        <button id="non-style-btn" onClick={this.props.onLogout}>Đăng xuất</button>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;