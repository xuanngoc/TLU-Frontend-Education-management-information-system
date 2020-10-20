import React, { Component } from 'react'
import HOST from '../../Host';

export default class DetailDepartment extends Component {

    constructor() {
        super();
        this.url = window.location.href.split('/');
        this.state = {
            maBoMon: this.url[this.url.length - 1],
            tenBoMon: "",
            truongBoMon: null,
            listTeachers: [],
        }
        
        this.onChange = this.onChange.bind(this);
    }

    getDepartmentInfo = () => {
        fetch(HOST + '/bo-mon/' + this.state.maBoMon, {
            headers: {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                tenBoMon: data.tenBoMon,
                truongBoMon: data.truongBoMon
            })
        })
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

    componentDidMount() {
        this.getDepartmentInfo();
        this.getListTeacher();
    }

    onSubmit = (e) => {
        const data = {
            maBoMon: this.state.maBoMon,
            tenBoMon: this.state.tenBoMon,
            truongBoMon: this.state.truongBoMon
        }
        e.preventDefault();
        
        fetch(HOST + '/bo-mon', {
            headers: {
                "Authorization": this.props.store.token,
                "content-type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    onChange = (e) => {
        this.setState({
            truongBoMon: e.target.value
        })
    }

    render() {
        const maGiaoVien = this.state.maGiaoVien;
        return (
            <div className="col-9">
                <h2 className="text-center mt-3 text-primary">{this.state.maBoMon} - {this.state.tenBoMon}</h2>
                <div className="row">
                    <form className="offset-2 col-8" onSubmit={this.onSubmit}>
                        <div className="form-group ">
                        <label >Chọn trưởng bộ môn</label>
                        <select name="truongBoMon" className="form-control" onChange={this.onChange}>
                            {this.state.listTeachers.map(teacher => 
                                <option value={teacher.maGiaoVien} selected={maGiaoVien === teacher.maGiaoVien} >
                                    {teacher.maGiaoVien} - {teacher.user.fullname}
                                </option>
                            )}
                            
                        </select>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
