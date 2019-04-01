import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from '../authentication/login'
import RegNewCompany from '../authentication/newCompanyReg'
import userAPImgr from '../../modules/userAPImgr'
import companyAPImgr from '../../modules/companyAPImgr'
import ExecLandingPage from '../executives/execLandingPage'
import EmployeeList from '../executives/employeeList'
import EmployeeForm from '../executives/employeeForm'
import EmployeeEditForm from '../executives/employeeEditForm'
import TaskList from '../tasks/taskList'
import TaskForm from '../tasks/taskForm'
import TaskEditForm from '../tasks/taskEditForm'
// import Callback from '../authentication/callBack'
// import ResourceList from '../generics/resourceList'
// import Auth0Client from "../authentication/auth"

export default class ApplicationViews extends Component {


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

    getCompTasks = compId =>
        companyAPImgr.getCompanyTasks(compId)
            .then(pct => {

                this.setState({
                    tasks: pct,
                })
                console.log(pct)
            })

    addTask = newTask => {
        const newState = {}
        return companyAPImgr.postNewTask(newTask)
            .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId")))
                .then(pct => {
                    newState.tasks = pct
                    this.setState(newState)
                })
    }

    updateTask = (editedTask, id) => {
        const newState = {}
        return companyAPImgr.updateTask(editedTask, id)
            .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"))
                .then(pct => {
                    newState.tasks = pct
                    this.setState(newState)
                })
            );
    }

    deleteTask = (taskId) => {
        const newState = {}
        return companyAPImgr.deleteTask(taskId)
        .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId")))
                .then(pct => {
                    newState.tasks = pct
                    this.setState(newState)
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
                return companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"));
            })
            .then(pct => {
                newState.tasks = pct
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
                        return <TaskList  {...props} users={this.state.users} tasks={this.state.tasks} newTask={this.newTask} deleteTask={this.deleteTask} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/tasks/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <TaskForm  {...props} tasks={this.state.tasks} addTask={this.addTask} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/tasks/:taskId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask} />
                    } else {
                        return <Redirect to="/" />
                    }
                }
                } />


            </div>
        )
    }
}

