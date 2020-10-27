import React, { Component } from 'react';

class DetailEducationProgram extends Component {

    

    render() {
        if (this.props.educationProgram !== {}) {
            const namHoc =  this.props.educationProgram.namHoc.tenNamHoc;
            const nganhHoc = this.props.educationProgram.nganhHoc.tenNganhHoc;

            return (
            
                <div className="row justify-content-center">
                    <span className="mr-5" style={{fontSize: "1.7em"}}>Năm học: {namHoc}</span> 
                    <span className="ml-5" style={{fontSize: "1.7em"}}>Ngành học: {nganhHoc}</span>   
                </div>
            );

        }
        
        
    }
}

export default DetailEducationProgram;