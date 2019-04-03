import React, { Component } from 'react'
import { Link } from "react-router-dom";
import userAPImgr from '../../modules/userAPImgr'
import EmployeeCard from './employeeCard'
// import ResourceCard from '../generics/resourceCard'
// import EmployeeCard from './employeeCard'
// import PropTypes from "prop-types"
import "./employees.css"

export default class EmployeeList extends Component {
    state = {
        // users: [],
        // tasks: [],
        // empTasks: [],
        // departments: [],
        filterEmps: [],
        searchName: []
    }

    searchCompUsers = () => {
        const newState = {}
                const filteredEmps = this.props.employees.filter(
                    user => user.name.includes(this.state.searchName)
                    // user.userType === "employee" && user.isAdmin !== true &&
                )
                console.log(filteredEmps)
                newState.filterEmps = filteredEmps
                this.setState(newState)
    }

    empSearch = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        this.searchCompUsers()
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="header">Employee Manager</h1>
                <div className="hireEmployeeButton">
                    <button type="button"
                        className="btn btn-success" id="hireEmpBtn"
                        onClick={() => {
                            this.props.history.push("/employees/new")
                        }
                        }>
                        Hire Employee
                    </button>
                </div >
                <section className="empSearch">
                    <h3 className="sectHeader">Search For Employees</h3>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        required
                        className="search-form-control"
                        onChange={this.empSearch}
                        id="searchName"
                        placeholder="First Name"
                    />
                    <br></br>
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        required
                        className="search-form-control"
                        onChange={this.empSearch}
                        id="searchSurname"
                        placeholder="Surname"
                    />
                </section>
                <br></br>
                <br></br>
                <section className="employees">
                    {
                        this.props.employees.map(employee => {
                            // console.log(employee)
                            return (
                                <div key={employee.id}>
                                    < EmployeeCard key={employee.id} employee={employee} route={"employees"} deleteEmp={this.props.deleteEmp} {...this.props} />
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