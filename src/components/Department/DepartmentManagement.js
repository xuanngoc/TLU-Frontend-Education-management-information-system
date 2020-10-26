import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import HOST from '../../Host';
import FromInsertDepartment from './FromInsertDepartment';

export default class DepartmentManagement extends Component {

    

    constructor() {
        super();
        this.state = {
            departments: [],
            showModalInsert: false,
        }
        
    }

    getDepartments = () => {
        fetch(HOST + '/bo-mon', {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data =>{
            this.setState({
                departments: data
            });
            console.log(data);
        } )
    }

    showModal = () => {
        this.setState({
            showModalInsert: true,
        })
    }

    hideForm = () => {
        this.setState({
            showModalInsert: false,
        })
        this.getDepartments();
    }

    componentWillMount() {
        this.getDepartments();
    }

    render() {
        return (
            <div className="col-9">
                <h1 className="text-center mt-3">Quản lý bộ môn</h1>
                <div className="row">
                    <button className="offset-9 btn btn-primary" onClick={this.showModal}>Thêm mới bộ môn</button>
                    
                </div>
                <FromInsertDepartment onShow={this.state.showModalInsert} onHide={this.hideForm} store={this.props.store}/>
                <div className="row ml-5 mr-5 mt-2">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã bộ môn</th>
                                <th>Tên bộ môn</th>
                                <th>Trưởng bộ môn</th>
                                <th className="text-center">Xem chi tiết</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.departments.map((department, index) => 
                                <tr key={department.maBoMon}>
                                    <td>{index + 1}</td>
                                    <td>{department.maBoMon}</td>
                                    <td>{department.tenBoMon}</td>
                                    <td className="text-danger">{department.truongBoMon === null ? 'Chưa có trưởng bộ môn' : department.truongBoMon}</td>
                                    <td className="text-center">
                                        <Link to={"quan-ly-bo-mon/" + department.maBoMon} ><i className="fas fa-info-circle text-info " style={{fontSize: "1.5em"}}></i></Link>
                                    </td>
                                    <td>
                                        <button className="btn"><i className="fas fa-trash-alt text-danger" style={{fontSize: "1.3em"}}></i></button>
                                    </td>
                                        
                                </tr>
                            )} 
                            
                        
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
