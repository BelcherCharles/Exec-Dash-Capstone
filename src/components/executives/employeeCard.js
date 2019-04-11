import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Modal from "react-responsive-modal";
import userAPImgr from '../../modules/userAPImgr'
import "./employees.css"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
export default class EmployeeCard extends Component {
    state = {
        open: false,
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        image: "",
        hireDate: ""
    };

    onOpenModal = () => {
        return userAPImgr.getOneUser(this.props.employee.id)
            .then(employee => {
                this.setState({
                    id: employee.id,
                    name: employee.name,
                    surname: employee.surname,
                    email: employee.email,
                    phone: employee.phone,
                    address: employee.address,
                    city: employee.city,
                    state: employee.state,
                    zip: employee.zip,
                    password: employee.password,
                    hireDate: employee.hireDate,
                    open: true
                });
            })
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleFieldChange = evt => {
        const updatedState = {
            ...this.state, // This is called the spread operator
            [evt.target.id]: evt.target.value
        }
        this.setState(updatedState)
    }

    updateEmployee = evt => {
        evt.preventDefault()

        if (this.state.name === "") {
            window.alert("Please enter the employee's name.");
        } else if (this.state.surname === "") {
            window.alert("Please enter the employee's surname.");
        } else if (this.state.email === "") {
            window.alert("Please enter the employee's email.");
        } else if (this.state.phone === "") {
            window.alert("Please enter the employee's name.");
        } else if (this.state.address === "") {
            window.alert("Please enter the employee's address.");
        } else if (this.state.city === "") {
            window.alert("Please enter the employee's city.");
        } else if (this.state.zip === "") {
            window.alert("Please enter the employee's zip.");
        } else if (this.state.state === "") {
            window.alert("Please enter the employee's state.");
        } else {
            const editedEmployee = {
                id: parseInt(this.props.employee.id),
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                hireDate: this.state.hireDate,
                password: this.state.password,
                companyId: parseInt(sessionStorage.getItem("companyId")),
                userType: "employee"
            };

            this.props.updateUser(editedEmployee, this.props.employee.id)
                .then(() => this.onCloseModal())
        }
    }

    render() {
        const { open } = this.state;
        if (sessionStorage.getItem("isAdmin") === "true") {
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


                            <button className="btn btn-primary" onClick={this.onOpenModal}>Edit Employee</button>
                            {/* this.props.history.push(`/employees/${this.props.employee.id}/edit`)} >Edit Employee</button> */}
                            <br></br>
                            <button onClick={() => this.props.deleteEmp(this.props.employee.id)}
                                className="btn btn-danger">Fire Employee
                        </button>
                        </h3>
                    </div>
                    <div style={styles}>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2 className="editHeader">Edit {this.props.employee.name}'s Info</h2>
                            <form className="employeeForm">
                                <div className="form-group">
                                    <label htmlFor="name">First Name</label>
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
                                    <br></br>
                                    <button type="submit" onClick={this.updateEmployee} className="btn btn-primary">
                                        Submit
                                 </button>
                                </div>
                            </form>
                        </Modal>
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
