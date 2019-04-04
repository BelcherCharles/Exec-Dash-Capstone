import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import PropTypes from "prop-types"
import "./employees.css"

export default class EmployeeCard extends Component {
    render() {
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
