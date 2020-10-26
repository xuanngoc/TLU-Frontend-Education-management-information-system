import React, { Component } from 'react';
import HOST from '../../Host';

class MajorManagement extends Component {
    
    constructor() {
        super();
        this.state = {
            majors: [],
            maNganhHoc: "",
            tenNganhHoc: "",
            maBoMon: "",
            listDepartments: []
            
        }
    }


    getMajors = () => {
        fetch(HOST + '/nganh-hoc', {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data =>{
            this.setState({
                majors: data
            });
            console.log(data);
        } )
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

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e) => {
        
        const data = {
            maNganhHoc: this.state.maNganhHoc,
            tenNganhHoc: this.state.tenNganhHoc,
            maBoMon: this.state.maBoMon
        }

        e.preventDefault();

        console.log(data);
        fetch(HOST + '/nganh-hoc', {
            headers: {
                "Authorization": this.props.store.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    componentDidMount() {
        this.getMajors();
        this.getListDepartment();
    }


    render() {
        const {maNganhHoc, tenNganhHoc, maBoMon, listDepartments} = this.state;
        return (
            <div className="col-9">
                <h1 className="text-center mt-3">Quản lý ngành đào tạo</h1>
                <div className="row m-2">
                    <button type="button" className="offset-8 col-2 btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Thêm ngành đào tạo
                    </button>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Thêm ngành học</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group ">
                                    <label >Chọn bộ môn</label>
                                    <select className="form-control" name="maBoMon" onChange={this.onChange} value={maBoMon}>
                                        {listDepartments.map(department => 
                                            <option key={department.maBoMon} value={department.maBoMon}>{department.tenBoMon}</option>
                                        )}
                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label >Mã ngành học</label>
                                    <input type="text" className="form-control" name="maNganhHoc" onChange={this.onChange} value={maNganhHoc} />
                                </div>

                                <div className="form-group">
                                    <label >Tên ngành học</label>
                                    <input type="text" className="form-control" name="tenNganhHoc" onChange={this.onChange} value={tenNganhHoc} />
                                </div>
                                
                                
                                <button type="button" className="btn btn-secondary mr-3" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Thêm</button>
                            </form>

                        </div>
                        </div>
                    </div>
                </div>
                <div className="row ml-5 mr-5 mt-2">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã ngành</th>
                                <th>Tên ngành</th>
                                <th>Tên bộ môn</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.majors.map((major, index) => 
                                <tr key={major.nganhHoc}>
                                    <td>{index + 1}</td>
                                    <td>{major.tenNganhHoc}</td>
                                    <td>{major.maNganhHoc}</td>
                                    <td className="text-danger">{major.boMon === null ? "nulll" : major.boMon.maBoMon}  </td>
                                    <td >
                                        <button className="btn"><i className="fas fa-info text-info" style={{fontSize: "1.3em"}}></i></button> 
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
        );
    }
}

export default MajorManagement;