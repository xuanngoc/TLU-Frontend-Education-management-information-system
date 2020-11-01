import React, { Component } from 'react';
import HOST from '../../Host';


class DetailEducationProgram extends Component {

    constructor() {
        super();
        this.state = {
            subjects: []
        }
    }

    getListSubjects = () => {
        fetch(HOST + '/mon-hoc/' + this.props.educationProgram.maChuongTrinhDaoTao, {
            headers : {
                "Authorization": this.props.store.token
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            subjects: data
        }))
    }

    componentDidMount() {
        this.getListSubjects();
    }

    addSubject = (event) => {
        
        this.getListSubjects();
        this.props.onProgramChange();
        
        const maChuongTrinh = this.props.educationProgram.maChuongTrinhDaoTao;
        const loaiChuongTrinh = event.target.value;

        const maMonHoc = event.target.name;
        const url = `${HOST}/chuong-trinh-dao-tao/${loaiChuongTrinh}/${maChuongTrinh}`;

        console.log(url);
        console.log(maMonHoc);

        fetch(url, {
            headers : {
                "Authorization": this.props.store.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                maMon: maMonHoc
            })
        })
        
        
    }

    render() {
        
        const namHoc =  this.props.educationProgram.namHoc.tenNamHoc;
        const nganhHoc = this.props.educationProgram.nganhHoc.tenNganhHoc;

        return (
            <div>
                <div className="row justify-content-center m-0">
                    <span className="mr-5" style={{fontSize: "1.7em"}}>Năm học: {namHoc}</span> 
                    <span className="ml-5" style={{fontSize: "1.7em"}}>Ngành học: {nganhHoc}</span>   
                </div>

                <div className="row justify-content-center mt-5 ml-0 mr-0">
                    <div className="col-7 mr-3 border border-secondary" style={{background: "#dff9fb"}}> 
                        <h5 className="text-center">Những học phần có trong hệ thống nhưng chưa được thêm vào CTDT này nè</h5>
                        <table className='table'>
                            <thead>
                                <tr>
                                    {/* <th>STT</th> */}
                                    <th>Mã học phần</th>
                                    <th>Tên học phần</th>
                                    <th>Thêm vào chương trình</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.subjects.map((subject, index) => 
                                    <tr key={subject.maMon}>
                                        {/* <td>{index+1}</td> */}
                                        <td>{subject.maMon}</td>
                                        <td>{subject.tenMon}</td>
                                        <td className="">
                                            <button className="btn btn-primary" value={"dai-cuong"} name={subject.maMon} style={{fontSize: "0.9em"}} onClick={this.addSubject}>Đại cương</button>
                                            <button className="btn btn-secondary" value={"chuyen-nganh"} name={subject.maMon} style={{fontSize: "0.9em"}} onClick={this.addSubject}>Chuyên ngành</button>
                                            <button className="btn btn-info" value={"tu-do"} name={subject.maMon} style={{fontSize: "0.9em"}} onClick={this.addSubject} >Tự do</button>
                                        </td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="col-5- ml-3 border border-secondary" style={{background: "#dff9fb"}}>
                        <h5 className="text-center">Những học phần đã được thêm vào chương trình đào tạo nè</h5>
                        
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã học phần</th>
                                    <th>Tên học phần</th>
                                    
                                </tr>
                            </thead>
                            
                            <tbody>
                                
                                {this.props.educationProgram.hocChuongTrinhDaoTao.map((subject, index) => 
                                    <tr key={subject.monHoc.maMon}>
                                        <td>{index+1}</td> 
                                        <td>{subject.monHoc.maMon}</td>
                                        <td>{subject.monHoc.tenMon}</td>
                                        
                                    </tr>
                                    
                                )}
                                
                            </tbody>
                            
                            
                        </table>
                    </div>
                </div>
            </div>
        );

    }
        
}

export default DetailEducationProgram;