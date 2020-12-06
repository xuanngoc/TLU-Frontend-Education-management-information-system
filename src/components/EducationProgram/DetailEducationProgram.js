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

    removeSubject = (event) => {
        const id = event.target.name;
        fetch(`${HOST}/chuong-trinh-dao-tao/remove/${id}`, {
            headers: {
                "Authorization": this.props.store.token
            },
            method: "DELETE",
        })
        this.props.onProgramChange();
    }

    render() {
        
        const namHoc =  this.props.educationProgram.namHoc.tenNamHoc;
        const nganhHoc = this.props.educationProgram.nganhHoc.tenNganhHoc;

        return (
            <div >
                <div className="row justify-content-center m-0">
                    <span className="mr-5" style={{fontSize: "1.7em"}}>Năm học: {namHoc}</span> 
                    <span className="ml-5" style={{fontSize: "1.7em"}}>Ngành học: {nganhHoc}</span>   
                </div>

                <div className="row justify-content-center mt-5 ml-0 mr-0">
                    <div className="col-7 border border-secondary" style={{background: "#dff9fb"}}> 
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
                                        <td style={{fontSize: "0.9em"}}>{subject.maMon}</td>
                                        <td style={{fontSize: "0.9em"}}>{subject.tenMon}</td>
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
                        <h6 className="text-center">Những học phần đã được thêm vào chương trình đào tạo nè</h6>
                        
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã học phần</th>
                                    <th>Tên học phần</th>
                                    <th>Xóa</th>
                                    
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="ml-3 font-weight-bold" >1. Giáo dục đại cương</td>
                                </tr>
                                {this.props.educationProgram.hocChuongTrinhDaoTao.filter(ctdt => ctdt.loaiChuongTrinh === "DAI_CUONG" ).map((subject, index) => 
                                    <tr key={subject.monHoc.maMon}>
                                        <td style={{fontSize: "0.9em"}}>{index+1}</td> 
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.maMon}</td>
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.tenMon}</td>
                                        <td>
                                            <button className="btn btn-danger" name={subject.id} onClick={this.removeSubject}>Xoa</button>
                                        </td>                                                                                
                                    </tr>
                                )}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="ml-3 font-weight-bold" >2. Giáo dục chuyên nghiệp</td>
                                </tr>                       
                                {this.props.educationProgram.hocChuongTrinhDaoTao.filter(ctdt => ctdt.loaiChuongTrinh === "CHUYEN_NGANH" ).map((subject, index) => 
                                    <tr key={subject.monHoc.maMon}>
                                        <td style={{fontSize: "0.9em"}}>{index+1}</td> 
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.maMon}</td>
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.tenMon}</td>
                                        <td >
                                            < button className="btn btn-danger" name={subject.id} onClick={this.removeSubject}>Xoa</button>    
                                        </td>
                                    </tr>
                                )}
                                
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="ml-3 font-weight-bold" >3. Lựa chọn tự do</td>
                                </tr>
                                {this.props.educationProgram.hocChuongTrinhDaoTao.filter(ctdt => ctdt.loaiChuongTrinh === "TU_DO" ).map((subject, index) => 
                                    <tr key={subject.monHoc.maMon}>
                                        <td style={{fontSize: "0.9em"}}>{index+1}</td> 
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.maMon}</td>
                                        <td style={{fontSize: "0.9em"}}>{subject.monHoc.tenMon}</td>
                                        <td> 
                                            <button className="btn btn-danger" name={subject.id} onClick={this.removeSubject}>Xoa</button>
                                        </td>
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