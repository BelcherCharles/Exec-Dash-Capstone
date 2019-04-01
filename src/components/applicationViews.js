import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './authentication/login'
import RegNewCompany from './authentication/newCompanyReg'
import userAPImgr from '../modules/userAPImgr'
import companyAPImgr from '../modules/companyAPImgr'
import ExecLandingPage from './executives/execLandingPage'
import EmployeeList from './executives/employeeList'
import EmployeeForm from './executives/employeeForm'
import EmployeeEditForm from './executives/employeeEditForm'
import TaskManager from '../components/tasks/tasks'
// import Callback from '../authentication/callBack'
// import ResourceList from '../generics/resourceList'
// import Auth0Client from "../authentication/auth"

class ApplicationViews extends Component {


    state = {
        users: [],
        companies: [],
        departments: [],
        tasks: [],
        empTasks: [],
        employees: []
    }



    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("userId") !== null && sessionStorage.getItem("companyId") !== null

    getCompUsers = compId =>
        userAPImgr.getCompanyUsers(compId)
            .then(cu =>
                this.setState({
                    users: cu
                })
            );

    getCompEmps = compId =>
        userAPImgr.getCompanyUsers(compId)
            .then(pcu => {
                const employees = pcu.filter(
                    user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
                )
                this.setState({
                    users: pcu,
                    employees: employees
                })
                console.log(employees)
            })


    addUser = newUser =>
        userAPImgr.postNewUser(newUser)
            .then(() => userAPImgr.getCompanyUsers())
            .then(cu =>
                this.setState({
                    users: cu
                })
            );


    updateUser = (editedUser, id) => {
        const newState = {}
        return userAPImgr.updateUser(editedUser, id)
            .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
                .then(pcu => {
                    const employees = pcu.filter(
                        user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
                    )
                    newState.users = pcu
                    newState.employees = employees
                    this.setState(newState)
                })
            );
    }



    deleteEmp = userId => {
        const newState = {}
        userAPImgr.deleteEmp(userId)
            .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
                .then(pcu => {
                    const employees = pcu.filter(
                        user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
                    )
                    newState.users = pcu
                    newState.employees = employees
                    this.setState(newState)
                })
            )
    }

    addCompany = newCompany =>
        companyAPImgr.postNewCompany(newCompany)
    // .then(() => companyAPImgr.getAllCompanies())
    // .then(ac =>
    //     this.setState({
    //         companies: ac
    //     })
    // );

    newTask = newTask => {
        return companyAPImgr.postNewTask(newTask)
            .then(at => {
                this.setState({
                    tasks: at
                })
            })
    }


    componentDidMount() {
        const newState = {};
        userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
            .then(pcu => {
                // console.log(pcu)
                newState.users = pcu;

                const employees = pcu.filter(
                    user => user.companyId === parseInt(sessionStorage.getItem("companyId")) && user.hireDate !== ""
                )
                // console.log(employees)
                newState.employees = employees;
                this.setState(newState)
            })
    }

    render() {
        return (
            <div className="container-div">

                <Route exact path="/"
                    // component={Login}
                    render={props => {
                        return <Login {...props} />
                    }} />

                <Route path="/regNewCompany" render={(props) => {
                    return <RegNewCompany  {...props} addUser={this.addUser} addCompany={this.addCompany} />
                }} />

                <Route path="/execLandingPage" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ExecLandingPage  {...props} addUser={this.addUser} addCompany={this.addCompany} employees={this.employees} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList  {...props} users={this.state.users} employees={this.state.employees} getCompUsers={this.getCompUsers} addUser={this.addUser} deleteEmp={this.deleteEmp} getCompEmps={this.getCompEmps} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/employees/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeForm  {...props} addUser={this.addUser} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/employees/:employeeId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeEditForm {...props} employees={this.state.employees} updateUser={this.updateUser} />
                    } else {
                        return <Redirect to="/" />
                    }
                }
                } />

                <Route exact path="/taskManager" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <TaskManager  {...props} users={this.state.users} newTask={this.newTask} />
                    }
                    return <Redirect to="/" />
                }} />


            </div>
        )
    }
}

export default ApplicationViews