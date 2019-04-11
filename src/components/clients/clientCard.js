import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Modal from "react-responsive-modal";
import userAPImgr from '../../modules/userAPImgr'
// import PropTypes from "prop-types"
import "./clients.css"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
export default class ClientCard extends Component {
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
        userAPImgr.getOneUser(this.props.client.id)
            .then(client => {
                this.setState({
                    name: client.name,
                    surname: client.surname,
                    email: client.email,
                    phone: client.phone,
                    address: client.address,
                    city: client.city,
                    state: client.state,
                    zip: client.zip,
                    clientSince: client.clientSince,
                    open: true
                })
            })
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

    updateClient = evt => {
        evt.preventDefault()

        if (this.state.name === "") {
            window.alert("Please enter the client's name.");
        } else if (this.state.surname === "") {
            window.alert("Please enter the client's surname.");
        } else if (this.state.email === "") {
            window.alert("Please enter the client's email.");
        } else if (this.state.phone === "") {
            window.alert("Please enter the client's name.");
        } else if (this.state.address === "") {
            window.alert("Please enter the client's address.");
        } else if (this.state.city === "") {
            window.alert("Please enter the client's city.");
        } else if (this.state.zip === "") {
            window.alert("Please enter the client's state.");
        } else if (this.state.state === "") {
            window.alert("Please enter the client's zip.");
        } else {
            const editedClient = {
                id: parseInt(this.props.match.params.clientId),
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                clientSince: this.state.clientSince,
                companyId: parseInt(sessionStorage.getItem("companyId")),
                userType: "client"
            };

            this.props.updateUser(editedClient, this.props.client.id)
                .then(() => this.onCloseModal())
            //   this.props.history.push("/clientList"))
            // console.log(parseInt(this.props.match.params.employeeId))
            // console.log(editedEmployee)

        }
    }
    render() {
        const { open } = this.state;
        if (sessionStorage.getItem("isAdmin") === "true") {
            return (
                <React.Fragment>
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

                                <button className="btn btn-primary" onClick={this.onOpenModal}>Edit Client</button>
                                {/* {() => this.props.history.push(`/clients/${this.props.client.id}/edit`)} >Edit Client</button> */}
                                <br></br>
                                <button onClick={() => this.props.deleteClient(this.props.client.id)}
                                    className="btn btn-danger">Delete Client
                        </button>
                            </h3>
                        </div>
                    </div>
                    <div style={styles}>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2 className="editHeader">Edit {this.state.name}'s Info.</h2>
                            <form className="employeeForm">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="name"
                                        placeholder="First Name"
                                        value={this.state.name}
                                    />
                                    <br></br>
                                    <label htmlFor="surname">Surname</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="surname"
                                        placeholder="Surname"
                                        value={this.state.surname}
                                    />
                                    <br></br>
                                    <label htmlFor="userEmail">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                    />
                                    <br></br>
                                    <label htmlFor="phone">Phone #</label>
                                    <input
                                        type="tel"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="phone"
                                        placeholder="Phone #"
                                        value={this.state.phone}
                                    />
                                    <br></br>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="address"
                                        placeholder="Street Address"
                                        value={this.state.address}
                                    />
                                    <br></br>
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="city"
                                        placeholder="City"
                                        value={this.state.city}
                                    />
                                    <br></br>
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="state"
                                        placeholder="State"
                                        value={this.state.state}
                                    />
                                    <br></br>
                                    <label htmlFor="zip">Zip Code</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="zip"
                                        placeholder="Zip Code"
                                        value={this.state.zip}
                                    />
                                    <br></br>
                                    <button type="submit" onClick={this.updateClient} className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
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

                                <button className="btn btn-primary" onClick={this.onOpenModal}>Edit Client</button>
                                {/* <button className="btn btn-primary" onClick={() => this.props.history.push(`/clients/${this.props.client.id}/edit`)} >Edit Client</button> */}
                                <br></br>
                            </h3>
                        </div>
                    </div>
                    <div style={styles}>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2 className="editHeader">Edit {this.state.name}'s Info.</h2>
                            <form className="employeeForm">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="name"
                                        placeholder="First Name"
                                        value={this.state.name}
                                    />
                                    <br></br>
                                    <label htmlFor="surname">Surname</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="surname"
                                        placeholder="Surname"
                                        value={this.state.surname}
                                    />
                                    <br></br>
                                    <label htmlFor="userEmail">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                    />
                                    <br></br>
                                    <label htmlFor="phone">Phone #</label>
                                    <input
                                        type="tel"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="phone"
                                        placeholder="Phone #"
                                        value={this.state.phone}
                                    />
                                    <br></br>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="address"
                                        placeholder="Street Address"
                                        value={this.state.address}
                                    />
                                    <br></br>
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="city"
                                        placeholder="City"
                                        value={this.state.city}
                                    />
                                    <br></br>
                                    <label htmlFor="state">State</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="state"
                                        placeholder="State"
                                        value={this.state.city}
                                    />
                                    <br></br>
                                    <label htmlFor="zip">Zip Code</label>
                                    <input
                                        type="text"
                                        required
                                        className="edit-form-control"
                                        onChange={this.handleFieldChange}
                                        id="zip"
                                        placeholder="Zip Code"
                                        value={this.state.zip}
                                    />
                                    <br></br>
                                    <button type="submit" onClick={this.updateClient} className="btn btn-primary">
                                        Submit
                            </button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </React.Fragment>
            )
        }
    }
}
