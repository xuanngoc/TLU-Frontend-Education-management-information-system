import React, { Component } from 'react'

import './SubjectManagement.css'

export default class SubjectManagement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/mon-hoc', {
            headers : {
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjAyNzYzOTQ4LCJleHAiOjE2MDMzNjg3NDh9.uaE9d4E0VQJTs-VdStObPpM1rxSjU3IAm6c3DJ7we3jhF1KIAkp0Dv5-9LX1ZrPb-l-QbedXBjeki8BL_Epk6Q"
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                subjects: data
            }))
    }

    render() {
        return (
            <section className='section'>
                <h3 id='table-name' >Danh sách các môn học</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
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
