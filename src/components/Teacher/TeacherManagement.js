import React, { Component } from 'react'
import HOST from '../../Host';

export default class TeacherManagement extends Component {

    constructor() {
        super();
        this.state = {
            listTeachers: [],
            listDepartments: [],
            username: "",
            password: "",
            fullname: "",
            email: "",
            phone: "",
            maGiaoVien: "",
            maBoMon: ""
        }
    }

    getListTeacher = () => {
        fetch(HOST + '/giao-vien', {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            listTeachers: data
        }))
    }

    getListDepartment = () => {
        fetch(HOST + '/bo-mon', {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            listDepartments: data
        }))
    }

    componentDidMount() {
        this.getListTeacher();
        this.getListDepartment();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e) => {
        
        const data = {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            email: this.state.email,
            phone: this.state.phone,
            maGiaoVien: this.state.maGiaoVien,
            maBoMon: this.state.maBoMon
        }

        e.preventDefault();

        console.log(data);
        fetch(HOST + '/giao-vien', {
            headers: {
                "Authorization": this.props.store.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    render() {
        const {username, password, fullname, email, phone, maGiaoVien, listDepartments} = this.state;
        return (
            <div className="col-9">
                <h1 className="text-center mt-3">Quản lý giáo viên</h1>

                <div className="row m-2">
                    <button type="button" className="offset-8 col-2 btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Thêm giáo viên
                    </button>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Thêm giáo viên</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label >Tên người dùng</label>
                                    <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} />
                                </div>
                                <div className="form-group">
                                    <label >Mật khẩu</label>
                                    <input type="text" className="form-control" name="password" onChange={this.onChange} value={password} />
                                </div>
                                <div className="form-group">
                                    <label >Tên đầy đủ</label>
                                    <input type="text" className="form-control" name="fullname" onChange={this.onChange} value={fullname} />
                                </div>
                                <div className="form-group">
                                    <label >Email</label>
                                    <input type="text" className="form-control" name="email" onChange={this.onChange} value={email} />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại</label>
                                    <input type="text" className="form-control" name="phone" onChange={this.onChange} value={phone} />
                                </div>
                                <div className="form-group">
                                    <label >Mã giáo viên</label>
                                    <input type="text" className="form-control" name="maGiaoVien" onChange={this.onChange} value={maGiaoVien} />
                                </div>
                                <div className="form-group ">
                                    <label >Chọn trưởng bộ môn</label>
                                    <select className="form-control" name="maBoMon" onChange={this.onChange}>
                                        {listDepartments.map(department => 
                                            <option key={department.maBoMon} value={department.maBoMon}>{department.tenBoMon}</option>
                                        )}
                                        
                                    </select>
                                 </div>
                                
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="row" >
                    <table className='offset-1 col-9 table'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã giáo viên </th>
                                    <th>Tên tên giáo viên</th>
                                    
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {this.state.listTeachers.map((teacher, index) => 
                                    <tr key={teacher.maGiaoVien}>
                                        <td>{index + 1}</td>
                                        <td>{teacher.maGiaoVien}</td>
                                        <td>{teacher.user.fullname}</td>
                                        
                                        <td>{teacher.user.email}</td>
                                        <td>{teacher.user.phone}</td>
                                            
                                    </tr>
                                )} 
                                
                            </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
