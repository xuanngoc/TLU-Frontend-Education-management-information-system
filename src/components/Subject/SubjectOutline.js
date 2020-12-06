import React, { Component } from 'react';
import HOST from '../../Host';

import { Link } from 'react-router-dom';

class SubjectOutline extends Component {

    constructor() {
        super();
        this.state = {
          subjects: [],
          schoolYears: [],
          maNamHoc: "",
          maMon: ""
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        // fetch()
      fetch(`${HOST}/mon-hoc/bo-mon/${this.props.maBoMon}`, {
        headers : {
            "Authorization": this.props.store.token
        }
      })
      .then(response => response.json())
      .then(data => this.setState({
          subjects: data
      }))

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
      } )
    }

    onSubmit = (e) => {
        e.preventDefault();

    }

    render() {
      const {subjects, schoolYears, maNamHoc, maMon} = this.state;
        return (
            <div className="col-10">
                <h3 className="text-center mt-3 mb-5">Quản lý đề  cương chi tiết</h3>
                <div className="row">
                    <form className="col-10 offset-2 form-inline"onSubmit={this.onSubmit} >
                        <div class="form-group">
                            <label className="mr-3" htmlFor="nam-hoc">Năm học</label>
                            <select class="form-control" name="maNamHoc" value={maNamHoc} onChange={this.onChange}>
                                {
                                  schoolYears.map(schoolYear => <option value={schoolYear.maNamHoc}>{schoolYear.tenNamHoc}</option> )
                                }
                            </select>
                        </div>
                        <div class="form-group ml-5 mr-5">
                            <label className="mr-3" htmlFor="tenHocPhan">Tên học phần</label>
                            <select class="form-control" name="maMon" value={maMon} onChange={this.onChange}>
                              { 
                                subjects.map(subject => <option value={subject.maMon}>{subject.tenMon}</option> )                                
                              }
                            </select>
                        </div>
                        <Link className=" ml-5 btn btn-primary" to={`quan-ly-de-cuong/${maNamHoc}/${maMon}/them`}>Đề cương chi tiết</Link>
                        
                    </form>

                </div>
                
            </div>
        );
    }
}

export default SubjectOutline;