import React, { Component } from 'react';
import HOST from '../../Host';
import DetailEducationProgram from './DetailEducationProgram';

class EducationProgram extends Component {


    constructor() {
        super();
        this.state = {
            schoolYears: [],
            majors: [],
            educationProgram: null,
            
            maNganhHoc: "",
            maNamHoc: "",
            
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
                schoolYears: data,
            });
            console.log(data);
        } )
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
                majors: data,
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
        e.preventDefault();
        this.getEducationProgram();
    }

    getEducationProgram = () => {
        const data = {
            maNamHoc: this.state.maNamHoc,
            maNganhHoc: this.state.maNganhHoc
        }

        fetch(HOST + '/chuong-trinh-dao-tao', {
            headers: {
                "Authorization": this.props.store.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                educationProgram: data
            })
        })
        .catch(error => console.log('An error occured ', error))
    }

    onProgramChange = () => {
        this.getEducationProgram();
        console.log("Change");
    }

    componentWillMount() {
        this.getSchoolYears();
        this.getMajors();
        
    }


    render() {
        return (
            <div className="col-10">
                <h1 className="text-center mt-3">Quản lý chương trình đào tạo</h1>
                <div className="row justify-content-center">
                    <div className="mt-5" >
                        <span className="text-info">Chọn năm học và ngành đào tạo để xem chương trình đào tạo</span>
                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <div className="form-group mb-2">
                                <label htmlFor="maNamHoc">Năm học</label>
                                <select name="maNamHoc" className="form-control ml-3" value={this.state.maNamHoc} onChange={this.onChange}>
                                    {
                                        this.state.schoolYears.map(year => 
                                            <option  key={year.maNamHoc} value={year.maNamHoc}>{year.tenNamHoc}</option>    
                                        )
                                    }
                                </select>
                            </div>

                            <div className="form-group mx-sm-3 mb-2 ml-5">
                                <label htmlFor="maNganhHoc">Ngành học</label>
                                <select name="maNganhHoc" className="form-control ml-3" value={this.state.maNganhHoc} onChange={this.onChange}> 
                                    {
                                        this.state.majors.map(major => 
                                            <option key={major.maNganhHoc} value={major.maNganhHoc}>{major.tenNganhHoc}</option>    
                                        )
                                    }
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary mb-2">Xem</button>
                        </form>
                    </div>
                </div>
                <hr></hr>
                {
                    this.state.educationProgram !== null ? 
                        <DetailEducationProgram store={this.props.store}  educationProgram={this.state.educationProgram} onProgramChange={this.onProgramChange} /> 
                        : 
                        ""
                }
                
               
            </div>
        );
    }
}

export default EducationProgram;