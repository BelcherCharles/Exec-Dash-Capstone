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
        empTasks: []
    }



    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("userId") !== null && sessionStorage.getItem("companyId") !== null

    // deleteAnimal = (id) => {
    //     return animalAPIManager.deleteAnimal(id)
    //         .then(animalAPIManager.getAllAnimals)
    //         .then(animals => this.setState({ animals: animals })
    //         )
    // }

    // addAnimal = animalObject =>
    //     animalAPIManager.postAnimal(animalObject)
    //         .then(() => animalAPIManager.getAllAnimals())
    //         .then(animals =>
    //             this.setState({
    //                 animals: animals
    //             })
    //         );
    getCompUsers = compId =>
        userAPImgr.getCompanyUsers(compId)
            .then(cu =>
                this.setState({
                    users: cu
                })
            );


    addUser = newUser =>
        userAPImgr.postNewUser(newUser)
            .then(() => userAPImgr.getCompanyUsers())
            .then(cu =>
                this.setState({
                    users: cu
                })
            );

    deleteEmp = userId => {
        userAPImgr.deleteEmp(userId)
            .then(() => userAPImgr.getCompanyUsers())
            .then(cu =>
                this.setState({
                    users: cu
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
        userAPImgr.getAllUsers()
            .then(pau => {
                // console.log(pau)
                newState.users = pau
            })
        // console.log(newState)
        this.setState(newState)
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
                        return <ExecLandingPage  {...props} addUser={this.addUser} addCompany={this.addCompany} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route exact path="/employees" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList  {...props} users={this.state.users} getCompUsers={this.getCompUsers} addUser={this.addUser} deleteUser={this.deleteUser} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/employees/new" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeForm  {...props} addUser={this.addUser} />
                    }
                    return <Redirect to="/" />
                }} />

                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <EmployeeEditForm {...props} />
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