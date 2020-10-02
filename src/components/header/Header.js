import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <img className='logo' src="./LogoTLU.jpg" alt='Logo Thang Long university' />
                <h3 id='system-name' className='header-items'>Hệ thống quản lý chương trình đào tạo</h3>
                <div id='account-info' className='header-items'>
                    Hello <strong>Bui Xuan Ngoc</strong>
                </div>
            </header>
        )
    }
}

export default Header;