import React, { Component } from 'react';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import HOST from '../../Host';

class FormInsertSubjectOutline extends Component {
    constructor() {
        super();
        this.maNamHoc = window.location.href.split("/")[4];
        this.maHocPhan = window.location.href.split("/")[5];
        this.state = {
            hocPhan: {},
            moTaHocPhan: "",
            thoiLuong: "",
            mucTieuHocPhan: "",
            taiLieuHocTap: "",
            danhGiaSinhVien: "",
            noiDungChiTiet: ""
        };
      }
    

    componentDidMount() {
        fetch(`${HOST}/mon-hoc/ma-mon/${this.maHocPhan}`, {
            headers : {
                "Authorization": this.props.store.token
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            hocPhan: data
        }));
    }

    handleChange = value => {
      this.setState({ 
          markdown: value 
      });
    };

    render() {
        const {hocPhan} = this.state;
        return (
            <div className="col-10">
                <h1 className="text-center">Đề cương chi tiết học phần</h1>
                <div className="row">
                    <form className="col-10 offset-1 mt-5">

                        <div className="form-group">
                            <h5 className="text-primary">Tên học phần: {hocPhan.tenMon}</h5>
                            <div className="row justify-content-start mt-4">
                                <span className="mr-5">Mã học phần: {hocPhan.maMon}</span>
                                <span className="mr-5">Số tín chỉ: {hocPhan.soTinChi}</span>
                                <span className="mr-5">Điều kiện tiên quyết: {hocPhan.hocPhanTienQuyet === null ? "Khong co" : hocPhan.hocPhanTienQuyet}</span>
                            </div> 
                        </div>
                        <div className="form-group" >
                            <label> Mô tả học phần:</label>
                            <SimpleMDE 
                                value={this.state.markdown}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group" >
                            <label>Thời lượng (giờ):</label>
                            <SimpleMDE 
                                value={this.state.markdown}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group" >
                            <label>Mục tiêu học phần:</label>
                            <SimpleMDE 
                                value={this.state.markdown}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group" >
                            <label> Đánh giá sinh viên:</label>
                            <SimpleMDE 
                                value={this.state.markdown}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group" >
                            <label> Nội dung chi tiết: </label>
                            <SimpleMDE 
                                value={this.state.markdown}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group" >
                            <label>Tài liệu học tập: </label>
                            
                        </div>
                       
                        
                    </form> 
                </div>
                               
            </div>
        );
    }
}

export default FormInsertSubjectOutline;