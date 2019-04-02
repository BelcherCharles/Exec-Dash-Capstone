import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import PropTypes from "prop-types"
import "./clients.css"

export default class ClientCard extends Component {
    render() {
        return (
            <div key={this.props.client.id} className="clientCard">
                <div className="clientCardBody">
                    <h3 className="clientCardTitle">
                        {/* <img src={this.props.employee.image} alt={this.props.employee.name} className="empImg" /> */}
                        <p>{this.props.client.name} {this.props.client.surname}</p>
                        <p>{this.props.client.email}</p>
                        <p>{this.props.client.phone}</p>
                        <p>{this.props.client.address}</p>
                        <p>{this.props.client.city}, {this.props.client.state} {this.props.client.zip}</p>
                        {/* <p>{this.props.employee.id}</p> */}

                       <button className="btn btn-primary"  onClick={() => this.props.history.push(`/clients/${this.props.client.id}/edit`)} >Edit Client</button>
                        <br></br>
                        <button onClick={() => this.props.deleteClient(this.props.client.id)}
                            className="btn btn-danger">Delete Client
                        </button>
                    </h3>
                </div>
            </div>
        )
    }
}