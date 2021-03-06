import React, { Component } from 'react'
import HOST from '../../Host'

import './SubjectManagement.css'

export default class SubjectManagement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        fetch(HOST + '/mon-hoc', {
            headers : {
                "Authorization": this.props.store.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                subjects: data
            }))
    }

    render() {
        return (
            <section className='col-10'>
                <h3 id='table-name' >Danh sách các môn học z</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>Bộ môn</th>
                            <th>Số tín chỉ</th>
                            <th>Điều kiện tiên quyết</th>
                            <th>Số giờ</th>
                            
                            <th>Hệ số</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subjects.map((subject, index) => 
                            <tr key={subject.maMon}>
                                <td>{index+1}</td>
                                <td>{subject.maMon}</td>
                                <td>{subject.tenMon}</td>
                                <td>{typeof subject.boMon === 'object' ? subject.boMon.maBoMon : subject.boMon }</td>
                                <td>{subject.soTinChi}</td>
                                <td>{subject.hocPhanTienQuyet}</td>
                                <td>{subject.soGio}</td>
                                <td>{subject.heSo}</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </section>
        )
    }
}
