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

export default class ApplicationViews extends Component {

    state = {
        users: [],
        companies: [],
        departments: [],
        tasks: [],
        empTasks: [],
        employees: [],
        filterEmps: [],
        filterClients: [],
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

    newTask = newTask => {
        const newState = {}
        return companyAPImgr.postNewTask(newTask)
            .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId")))
            .then(pct => {
                newState.tasks = pct
                this.setState(newState)
            })
    }

    archiveTask = id => {
        const newState = {}
        return companyAPImgr.archiveTask(id)
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

    assignTo = (taskId, userId) => {
        const newState = {}
        return companyAPImgr.assignTask(taskId, userId)
        .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"))
                .then(pct => {
                    newState.tasks = pct
                    this.setState(newState)
                })
            );
    }

    markComplete = (id) => {
        const newState = {}
        return companyAPImgr.markTaskComp(id)
            .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"))
            .then(pct => {
                const empTasks = pct.filter(task => task.userId === +sessionStorage.getItem("userId") && task.isComplete == false)
                // console.log(pct)
                // console.log(empTasks)
                newState.tasks = pct
                newState.empTasks = empTasks
                    this.setState(newState)
                })
            );
    }

    reopenTask = (id) => {
        const newState = {}
        return companyAPImgr.reopenTask(id)
            .then(() => companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"))
            .then(pct => {
                const empTasks = pct.filter(task => task.userId === +sessionStorage.getItem("userId") && task.isComplete == false)

                newState.tasks = pct
                newState.empTasks = empTasks
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
                newState.filterClients = clients;
                return companyAPImgr.getCompanyTasks(sessionStorage.getItem("companyId"));
            })
            .then(pct => {
                const empTasks = pct.filter(task => task.userId === +sessionStorage.getItem("userId") && task.isComplete == false)
                // console.log(pct)
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
                        return <Login {...props} handleLogin={this.props.handleLogin} getCompData={this.getCompData} />
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
                        return <EmpLandingPage  {...props} tasks={this.state.tasks} empTasks={this.state.empTasks} markTaskComp={this.markComplete}/>
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList  {...props} users={this.state.users} employees={this.state.employees} addUser={this.addUser} deleteEmp={this.deleteEmp} filterEmps={this.state.filterEmps} updateUser={this.updateUser} />
                        // getCompUsers={this.getCompUsers} getCompEmps={this.getCompEmps}
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/taskManager" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <TaskList  {...props} users={this.state.users} tasks={this.state.tasks} newTask={this.newTask} deleteTask={this.deleteTask} updateTask={this.updateTask} employees={this.state.employees} markTaskComp={this.markTaskComp} assignTo={this.assignTo} archiveTask={this.archiveTask} reopenTask={this.reopenTask}/>
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/clientList" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <ClientList  {...props} clients={this.state.clients} getCompClients={this.getCompClients} addUser={this.addUser} deleteClient={this.deleteClient} updateUser={this.updateUser} />
                    }
                    return <Redirect to="/" />
                }} />

            </div>
        )
    }
}