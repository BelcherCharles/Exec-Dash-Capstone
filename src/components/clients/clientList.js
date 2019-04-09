import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import userAPImgr from '../../modules/userAPImgr'
import ClientCard from './clientCard'
// import ResourceCard from '../generics/resourceCard'
// import EmployeeCard from './employeeCard'
// import PropTypes from "prop-types"
import "./clients.css"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default class ClientList extends Component {
    state = {
        open: false,
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    }

    onOpenModal = () => {
        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    handleFieldChange = evt => {
        const updatedState = {
            ...this.state, // This is called the spread operator
            [evt.target.id]: evt.target.value
        }
        this.setState(updatedState)
    }

    buildNewClient = evt => {
        evt.preventDefault();
        if (this.state.department === "") {
            window.alert("Please select a department");
        } else {
            const newClient = {
                name: this.state.firstName,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                companyId: parseInt(sessionStorage.getItem("companyId")),
                clientSince: new Date(),
                userType: "client",
                image: this.state.image

                // department: this.state.department,
            };

            // console.log(newClient)
            //   debugger;
            // Create the animal and redirect user to animal list
            this.props.addUser(newClient)
                .then(() => this.onCloseModal());

        };
    }

    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <h1 className="header">Client List</h1>
                <div className="addClientButton">
                    <button type="button"
                        className="btn btn-success" id="addClientBtn"
                        onClick={this.onOpenModal}>
                        {/* {() => {this.props.history.push("/clients/new")}}> */}
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
                <div style={styles}>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2 className="editHeader">Enter New Client Info.</h2>
                        <form className="employeeForm">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="firstName"
                                    placeholder="First Name"
                                />
                                <br></br>
                                <label htmlFor="surname">Surname</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="surname"
                                    placeholder="Surname"
                                />
                                <br></br>
                                <label htmlFor="userEmail">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="email"
                                    placeholder="Email"
                                />
                                <br></br>
                                <label htmlFor="phone">Phone #</label>
                                <input
                                    type="tel"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="phone"
                                    placeholder="Phone #"
                                />
                                <br></br>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="address"
                                    placeholder="Street Address"
                                />
                                <br></br>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="city"
                                    placeholder="City"
                                />
                                <br></br>
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="state"
                                    placeholder="State"
                                />
                                <br></br>
                                <label htmlFor="zip">Zip Code</label>
                                <input
                                    type="text"
                                    required
                                    className="client-form-control"
                                    onChange={this.handleFieldChange}
                                    id="zip"
                                    placeholder="Zip Code"
                                />
                                <br></br>
                                <button type="submit" onClick={this.buildNewClient} className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}