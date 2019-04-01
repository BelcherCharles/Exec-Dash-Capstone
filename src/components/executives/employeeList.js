import React, { Component } from 'react'
import { Link } from "react-router-dom";
import userAPImgr from '../../modules/userAPImgr'
import EmployeeCard from './employeeCard'
// import ResourceCard from '../generics/resourceCard'
// import EmployeeCard from './employeeCard'
// import PropTypes from "prop-types"
// import "./employees.css"

export default class EmployeeList extends Component {
    // state = {
    //     users: [],
    //     tasks: [],
    //     empTasks: [],
    //     departments: [],
    //     employees: []
    // }


    // deleteEmp = () => {
    //     const newState = {}
    //     userAPImgr.deleteEmp()
    //         .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
    //             .then(pcu => {
    //                 const employees = pcu.filter(
    //                     user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
    //                 )
    //                 newState.users = pcu
    //                 newState.employees = employees
    //                 this.setState(newState)
    //             })
    //         )
    // }

    componentDidMount() {
        this.props.getCompEmps(sessionStorage.getItem("companyId"))
    //     const newState = {};
    //     userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
    //         .then(pcu => {
    //             const employees = pcu.filter(
    //                 user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
    //             )
    //             newState.users = pcu
    //             newState.employees = employees
    //             this.setState(newState)
    //         })
    }


    render() {
        return (
            <React.Fragment>
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
                <section className="employees">
                    {
                        this.props.employees.map(employee => {
                            console.log(employee)
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