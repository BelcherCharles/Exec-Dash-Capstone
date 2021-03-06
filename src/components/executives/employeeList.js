import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import userAPImgr from '../../modules/userAPImgr'
import EmployeeCard from './employeeCard'
// import PropTypes from "prop-types"
import "./employees.css"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default class EmployeeList extends Component {
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
        hireDate: "",
        // filterEmps: [],
        searchName: []
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

    buildNewUser = evt => {
        evt.preventDefault();
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
            var generator = require('generate-password');

            var newUserPass = generator.generate({
                length: 8,
                numbers: true
            });

            window.alert(`${this.state.email}'s password is ${newUserPass}`)
            // console.log(newUserPass);
            const newUser = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                image: this.state.image,
                companyId: parseInt(sessionStorage.getItem("companyId")),
                hireDate: new Date(),
                userType: "employee",
                password: newUserPass


            };

            this.props.addUser(newUser)
                .then(() => this.onCloseModal());

            const newState = {
                name: "",
                surname: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                image: "",
                hireDate: "",
            }
            this.setState(newState)
        }
    }

        empSearch = evt => {
            const newState = {}
            const filteredEmps = this.props.employees.filter(
                user => user.name.toLowerCase().includes(evt.target.value.toLowerCase()) || user.surname.toLowerCase().includes(evt.target.value.toLowerCase())
            )

            newState.filterEmps = filteredEmps
            this.setState(newState)
        }

        render() {
            const { open } = this.state;

                let empsToPrint = ""
                if (!this.state.filterEmps) {
                    empsToPrint = this.props.employees
                }
                else if (this.state.filterEmps.length === 0) {
                    empsToPrint = []
                } else {
                    empsToPrint = this.state.filterEmps
                }

            // let empsToPrint = ""
            // if (this.state.filterEmps.length === 0) {
            //     empsToPrint = this.props.filterEmps
            // } else {
            //     empsToPrint = this.state.filterEmps
            // }

            if (sessionStorage.getItem("isAdmin") === "true") {
                return (
                    <React.Fragment>
                        <h1 className="header">Employee Manager</h1>
                        <div className="hireEmployeeButton">
                            <button type="button" className="btn btn-success" id="hireEmpBtn" onClick={this.onOpenModal}>

                                Hire Employee
                    </button>
                        </div >
                        <section className="empSearch">
                            <h3 className="sectHeader">Search For Employees</h3>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                required
                                className="empSearchInput"
                                onChange={this.empSearch}
                                id="searchName"
                                placeholder="First Name"
                            />
                            <br></br>
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                required
                                className="empSearchInput"
                                onChange={this.empSearch}
                                id="searchSurname"
                                placeholder="Surname"
                            />
                        </section>
                        <br></br>
                        <br></br>
                        <section className="employees">
                            {
                                empsToPrint.map(employee => {
                                    return (
                                        <div key={employee.id}>
                                            < EmployeeCard key={employee.id} employee={employee} route={"employees"} deleteEmp={this.props.deleteEmp} updateUser={this.props.updateUser} {...this.props} />
                                        </div>
                                    )
                                })}
                        </section>
                        <div style={styles}>
                            <Modal open={open} onClose={this.onCloseModal} center>
                                <h2 className="editHeader">Enter New Employee Info.</h2>
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
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
                                        // value=""
                                        />
                                        <br></br>
                                        <label htmlFor="image">Photo</label>
                                        <input
                                            type="url"
                                            className="edit-form-control"
                                            onChange={this.handleFieldChange}
                                            id="image"
                                        // value=""
                                        />
                                        <br></br>
                                        <br></br>
                                        <button type="submit" onClick={this.buildNewUser} className="btn btn-primary">
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
                        <h1 className="header">Employee Listing</h1>
                        <br></br>
                        <section className="empSearch">
                            <h3 className="sectHeader">Search For Employees</h3>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                required
                                className="empSearchInput"
                                onChange={this.empSearch}
                                id="searchName"
                                placeholder="First Name"
                            />
                            <br></br>
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                required
                                className="empSearchInput"
                                onChange={this.empSearch}
                                id="searchSurname"
                                placeholder="Surname"
                            />
                        </section>
                        <br></br>
                        <br></br>
                        <section className="employees">
                            {
                                empsToPrint.map(employee => {

                                    return (
                                        <div key={employee.id}>
                                            < EmployeeCard key={employee.id} employee={employee} route={"employees"}
                                                {...this.props} />
                                        </div>
                                    )
                                }
                                )
                            }
                        </section>
                    </React.Fragment >
                )
            }
        }
    }