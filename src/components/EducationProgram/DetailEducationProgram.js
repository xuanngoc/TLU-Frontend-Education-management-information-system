import React, { Component } from 'react';
import HOST from '../../Host';


class DetailEducationProgram extends Component {

    constructor() {
        super();
        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        fetch(HOST + '/mon-hoc', {
            headers : {
                "Authorization": this.props.store.token
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            subjects: data
        }))
    }


    render() {
        
        const namHoc =  this.props.educationProgram.namHoc.tenNamHoc;
        const nganhHoc = this.props.educationProgram.nganhHoc.tenNganhHoc;

        return (
            <div>
                <div className="row justify-content-center">
                    <span className="mr-5" style={{fontSize: "1.7em"}}>Năm học: {namHoc}</span> 
                    <span className="ml-5" style={{fontSize: "1.7em"}}>Ngành học: {nganhHoc}</span>   
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-6 mr-4 border border-secondary" style={{background: "#dff9fb"}}> 
                        <h7 className="text-center">Những học phần có trong hệ thống nhưng chưa được thêm vào CTDT này nè</h7>
                        <table className='table'>
                            <thead>
                                <tr>
                                    {/* <th>STT</th> */}
                                    <th>Mã học phần</th>
                                    <th>Tên học phần</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.subjects.map((subject, index) => 
                                    <tr key={subject.maMon}>
                                        {/* <td>{index+1}</td> */}
                                        <td>{subject.maMon}</td>
                                        <td>{subject.tenMon}</td>
                                        <td><button className="btn btn-primary">Thêm vào đại cương</button></td>
                                        <td><button className="btn btn-secondary">Thêm vào chuyên ngành</button></td>
                                        <td><button className="btn btn-info">Thêm vào tự do</button></td>
                                        
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="col-5 ml-4 border border-secondary" style={{background: "#dff9fb"}}>
                        <h7 className="text-center">Những học phần đã được thêm vào chương trình đào tạo nè</h7>
                    </div>
                </div>
            </div>
        );

    }
        
}

export default DetailEducationProgram;