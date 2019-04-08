import React, { Component } from 'react'
import { Link } from "react-router-dom";
import userAPImgr from '../../modules/userAPImgr'
import ClientCard from './clientCard'
// import ResourceCard from '../generics/resourceCard'
// import EmployeeCard from './employeeCard'
// import PropTypes from "prop-types"
import "./clients.css"

export default class ClientList extends Component {
    // state = {
    //     users: [],
    //     tasks: [],
    //     empTasks: [],
    //     departments: [],
    //     employees: []
    // }

    componentDidMount() {
        // this.props.getCompClients(sessionStorage.getItem("companyId"))
        }

    render() {
        return (
            <React.Fragment>
                <h1 className="header">Client List</h1>
                 <div className="addClientButton">
                    <button type="button"
                        className="btn btn-success" id="addClientBtn"
                        onClick={() => {
                            this.props.history.push("/clients/new")
                        }
                        }>
                        Add New Client
                    </button>
                </div >
               <section className="clients">
                    {
                        this.props.clients.map(client => {
                            // console.log(client)
                            return (
                                <div key={client.id}>
                                    < ClientCard key={client.id} client={client} deleteClient={this.props.deleteClient} {...this.props} />
                                </div>
                            )
                        }
                        )
                    }
                </section>
            </React.Fragment>
        );
    }
}