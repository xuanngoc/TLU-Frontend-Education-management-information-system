import React, { Component } from 'react'

import { Link } from "react-router-dom";

import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <Link to="/quan-ly-nghanh">Quản lý ngành đào tạo</Link>
                <Link to="/quan-ly-giao-vien">Quản lý giáo viên</Link>
                <Link to="/quan-ly-chuong-trinh-dao-tao">Quản lý chương trình đào tạo</Link>
                <Link to="/quan-ly-bo-mon">Quản lý bộ môn</Link>
                <Link to="/quan-ly-hoc-phan">Quản lý học phần</Link>
                <Link to="/quan-ly-de-cuong-chi-tiet">Quản lý đề cương chi tiết</Link>
            </nav>
        )
    }
}
