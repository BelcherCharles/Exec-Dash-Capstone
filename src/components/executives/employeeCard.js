import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import PropTypes from "prop-types"
import "./employees.css"

export default class EmployeeCard extends Component {
    render() {
        if (sessionStorage.getItem("isAdmin") === true) {
            return (
                <div key={this.props.employee.id} className="empCard">
                    <div className="empCardBody">
                        <h3 className="empCardTitle">
                            {/* <img src={this.props.employee.image} alt={this.props.employee.name} className="empImg" /> */}
                            <p>{this.props.employee.name} {this.props.employee.surname}</p>
                            <p>{this.props.employee.email}</p>
                            <p>{this.props.employee.phone}</p>
                            <p>{this.props.employee.address}</p>
                            <p>{this.props.employee.city}, {this.props.employee.state} {this.props.employee.zip}</p>
                            {/* <p>{this.props.employee.id}</p> */}

                            <button className="btn btn-primary" onClick={() => this.props.history.push(`/employees/${this.props.employee.id}/edit`)} >Edit Employee</button>
                            <br></br>
                            <button onClick={() => this.props.deleteEmp(this.props.employee.id)}
                                className="btn btn-danger">Fire Employee
                        </button>
                        </h3>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={this.props.employee.id} className="empCard">
                    <div className="empCardBody">
                        <h3 className="empCardTitle">
                            {/* <img src={this.props.employee.image} alt={this.props.employee.name} className="empImg" /> */}
                            <p>{this.props.employee.name} {this.props.employee.surname}</p>
                            <p>{this.props.employee.email}</p>
                            <p>{this.props.employee.phone}</p>
                            <p>{this.props.employee.address}</p>
                            <p>{this.props.employee.city}, {this.props.employee.state} {this.props.employee.zip}</p>
                        </h3>
                    </div>
                </div>
            )
        }
    }
}

{/* // EmployeeCard.propTypes = {
//     employee: PropTypes.shape ({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         department: PropTypes.string
//     })
// }

// export default EmployeeCard */}