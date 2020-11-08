import React, { Component } from 'react'
import HOST from '../../Host'

import './SubjectManagement.css'

export default class SubjectByDepartment extends Component {

    constructor() {
        super()
        this.state = {
            subjects: [],
            maBoMon: ""
        }
    }

    componentDidMount() {  
        console.log(this.props.maBoMon)
        fetch(`${HOST}/mon-hoc/bo-mon/${this.props.maBoMon}`, {
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
        // console.log(this.props.maBoMon)
        return (
            
            <section className='col-10'>
                <h3 id='table-name' >Danh sách các hoc phan thuoc bo mon</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subjects.map((subject, index) => 
                            <tr key={subject.maMon}>
                                <td>{index+1}</td>
                                <td>{subject.maMon}</td>
                                <td>{subject.tenMon}</td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </section>
        )
    }
}
