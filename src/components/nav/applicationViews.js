import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from '../authentication/login'
import Capstone from '../capstone'
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
import ClientList from '../clients/clientList'
import ClientForm from '../clients/clientForm'
import ClientEditForm from '../clients/clientEditForm'
import EmpLandingPage from '../employees/empLandingPage'
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
        employees: [],
        filterEmps: [],
        clients: []
    }

    isAuthenticated = () => sessionStorage.getItem("userId") !== null && sessionStorage.getItem("companyId") !== null

    getCompData = (compId, userId) => {
        const newState = {};
        userAPImgr.getCompanyUsers(compId)
            .then(pcu => {
                // console.log(pcu)
                newState.users = pcu;
                const employees = pcu.filter(
                    user => user.userType === "employee" && user.isAdmin !== true
                )
                // console.log(employees)
                newState.employees = employees;
                newState.filterEmps = employees
                const clients = pcu.filter(
                    client => client.userType === "client"
                )
                // console.log(clients)
                newState.clients = clients;
                return companyAPImgr.getCompanyTasks(compId);
            })
            .then(pct => {
                const empTasks = pct.filter(task => task.userId === userId)
                // console.log(pct)
                // console.log(empTasks)
                newState.tasks = pct
                newState.empTasks = empTasks
                this.setState(newState)
            })
    }
    // getCompUsers = () => {
    //     const newState = {}
    //     return userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
    //         .then(pcu => {
    //             const employees = pcu.filter(
    //                 user => user.userType === "employee" && user.isAdmin !== true
    //             )
    //             const clients = pcu.filter(
    //                 user => user.userType === "client"
    //             )
    //             newState.users = pcu
    //             newState.employees = employees
    //             newState.clients = clients
    //             this.setState(newState)
    //         });
    // }

    getCompEmps = () => {
        return userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
            .then(pcu => {
                const employees = pcu.filter(
                    user => user.userType === "employee" && user.isAdmin !== true
                )
                this.setState({
                    users: pcu,
                    employees: employees
                })
                console.log(employees)
            })
        }

    addUser = (newUser) => {
        const newState = {}
        return userAPImgr.postNewUser(newUser)
            .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId")))
            .then(pcu => {
                const employees = pcu.filter(
                    user => user.userType === "employee" && user.isAdmin !== true
                )
                const clients = pcu.filter(
                    user => user.userType === "client"
                )
                newState.users = pcu
                newState.employees = employees
                newState.filterEmps = employees
                newState.clients = clients
                this.setState(newState)
            });
    }

    updateUser = (editedUser, id) => {
        const newState = {}
        return userAPImgr.updateUser(editedUser, id)
            .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
                .then(pcu => {
                    const employees = pcu.filter(
                        user => user.userType === "employee" && user.isAdmin !== true
                    )
                    const clients = pcu.filter(
                        user => user.userType === "client"
                    )
                    newState.users = pcu
                    newState.filterEmps = employees
                    newState.employees = employees
                    newState.clients = clients
                    this.setState(newState)
                })
            );
    }
    // user.companyId === parseInt(sessionStorage.getItem("companyId")) &&

    deleteEmp = userId => {
        const newState = {}
        userAPImgr.deleteUser(userId)
            .then(() => userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
                .then(pcu => {
                    const employees = pcu.filter(
                        user => user.userType === "employee" && user.isAdmin !== true
                    )
                    newState.users = pcu
                    newState.employees = employees
                    newState.filterEmps = employees
                    this.setState(newState)
                })
            )
    }
    // user.companyId === parseInt(sessionStorage.getItem("companyId")) &&

    addCompany = newCompany =>
        companyAPImgr.postNewCompany(newCompany)

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

    getCompClients = (companyId) => {
        const newState = {}
        return userAPImgr.getCompanyUsers(companyId)
            .then(pcu => {
                const clients = pcu.filter(
                    user => user.userType === "client"
                )
                newState.users = pcu
                newState.clients = clients
                this.setState(newState)
            })
    }

    deleteClient = (clientId) => {
        const newState = {}
        return userAPImgr.deleteUser(clientId)
            .then(() => userAPImgr.getCompanyUsers(parseInt(sessionStorage.getItem("companyId"))))
            .then(pcu => {
                const clients = pcu.filter(
                    user => user.userType === "client"
                )
                newState.users = pcu
                newState.clients = clients
                this.setState(newState)
            })
    }

    componentWillMount() {
        const newState = {};
        userAPImgr.getCompanyUsers(sessionStorage.getItem("companyId"))
            .then(pcu => {
                // console.log(pcu)
                newState.users = pcu;
                const employees = pcu.filter(
                    user => user.userType === "employee" && user.isAdmin !== true
                )
                // console.log(employees)
                newState.employees = employees;
                newState.filterEmps = employees
                const clients = pcu.filter(
                    client => client.userType === "client"
                )
                // console.log(clients)
                newState.clients = clients;
                return companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"));
            })
            .then(pct => {
                const empTasks = pct.filter(task => task.userId === +sessionStorage.getItem("userId"))
                console.log(pct)
                // console.log(empTasks)
                newState.tasks = pct
                newState.empTasks = empTasks
                this.setState(newState)
            })
    }

    render() {
        return (
            <div className="container-div">

                <Route exact path="/"
                    // component={Login}
                    render={props => {
                        return <Login {...props} handleLogin={this.props.handleLogin} getCompData={this.getCompData}/>
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

                <Route path="/empLandingPage" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmpLandingPage  {...props} tasks={this.state.tasks} empTasks={this.state.empTasks} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList  {...props} users={this.state.users} employees={this.state.employees}  addUser={this.addUser} deleteEmp={this.deleteEmp} filterEmps={this.state.filterEmps} />
                        // getCompUsers={this.getCompUsers} getCompEmps={this.getCompEmps}
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
                        return <TaskList  {...props} users={this.state.users} tasks={this.state.tasks} newTask={this.newTask} deleteTask={this.deleteTask} employees={this.state.employees} />
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
                }} />

                <Route exact path="/clientList" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ClientList  {...props} clients={this.state.clients} getCompClients={this.getCompClients} addUser={this.addUser} deleteClient={this.deleteClient} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/clients/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ClientForm  {...props} clients={this.state.clients} addUser={this.addUser} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/clients/:clientId(\d+)/edit" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ClientEditForm {...props} client={this.state.clients} updateUser={this.updateUser} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />

            </div>
        )
    }
}