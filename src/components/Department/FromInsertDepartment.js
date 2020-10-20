import React, { Component } from 'react'
import HOST from '../../Host';

export default class FromInsertDepartment extends Component {

    constructor() {
        super();
        this.state = {
            maBoMon: "",
            tenBoMon: "",
            truongBoMon: "",
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const data = {
            maBoMon: this.state.maBoMon,
            tenBoMon: this.state.tenBoMon,
            truongBoMon: this.state.truongBoMon
        };

        fetch(HOST + '/bo-mon', {
            headers: {
                "Authorization": this.props.store.token,
                "content-type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        this.setState({
            maBoMon: "",
            tenBoMon: "",
        })

        this.props.onHide();
    }

    render() {
        const {maBoMon, tenBoMon} = this.state;
        return (
            <React.Fragment>
                {
                    this.props.onShow ? 
                    <div className="ml-5 mb-5 mt-3">
                        <h3 className="text-info">Thêm bộ môn</h3>
                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <div className="form-group mb-2">
                                <span>Mã bộ môn</span>
                                <input type="text" className="form-control" name="maBoMon" placeholder="Mã bộ môn" onChange={this.onInputChange} value={maBoMon} />
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <span>Tên bộ môn</span>
                                <input type="text" className="form-control" name="tenBoMon" placeholder="Tên bộ môn" onChange={this.onInputChange} value={tenBoMon} />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">Thêm</button>
                        </form>
                    </div>
                    :
                    <span></span>
                }
            </React.Fragment>       
        )
    }
}
