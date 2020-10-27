import React, { Component } from 'react';
import HOST from '../../Host';

class SchoolYear extends Component {


    constructor() {
        super();
        this.state = {
            tenNamHoc: "",
            schoolYears: []
            
        }
    }

    getSchoolYears = () => {
        fetch(HOST + '/nam-hoc', {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data =>{
            this.setState({
                schoolYears: data
            });
            console.log(data);
        } )
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e) => {
        
        const data = {
            tenNamHoc: this.state.tenNamHoc
        }

        e.preventDefault();

        console.log(data);
        fetch(HOST + '/nam-hoc', {
            headers: {
                "Authorization": this.props.store.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    componentDidMount() {
        this.getSchoolYears();
    }


    render() {
        return (
            <div className="col-9">
                <h1 className="text-center mt-3">Quản lý năm học</h1>
                <div className="row m-2">
                    <button type="button" className="offset-8 col-2 btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Thêm năm học
                    </button>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Thêm năm học</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                
                                <div className="form-group">
                                    <label >Tên năm học</label>
                                    <input type="text" className="form-control" name="tenNamHoc" onChange={this.onChange} value={this.state.tenNamHoc} />
                                </div>
                                
                                <button type="button" className="btn btn-secondary mr-3" data-dismiss="modal">Đóng</button>
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
                                <th>Tên năm học</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.schoolYears.map((year, index) => 
                                <tr key={year.maNamHoc}>
                                    <td>{index + 1}</td>
                                    <td>{year.tenNamHoc}</td>
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

export default SchoolYear;