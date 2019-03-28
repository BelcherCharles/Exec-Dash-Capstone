import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './authentication/login'
import RegNewCompany from './authentication/newCompanyReg'
import userAPImgr from '../modules/userAPImgr'
import companyAPImgr from '../modules/companyAPImgr'
import ExecLandingPage from './executives/execLandingPage'
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

    // updateAnimal = (editedAnimalObject) => {
    //     return animalAPIManager.put(editedAnimalObject)
    //         .then(() => animalAPIManager.getAllAnimals())
    //         .then(animals => {
    //             this.setState({
    //                 animals: animals
    //             })
    //         });
    // };

    addUser = newUser =>
        userAPImgr.postNewUser(newUser)
            .then(() => userAPImgr.getCompanyUsers())
            .then(cu =>
                this.setState({
                    users: cu
                })
            );

    // fireEmployee = id => {
    //     return fetch(`http://localhost:5002/employees/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(e => e.json())
    //         .then(() => fetch(`http://localhost:5002/employees`))
    //         .then(e => e.json())
    //         .then(employees => this.setState({
    //             employees: employees
    //         })
    //         )
    // }

    addCompany = newCompany =>
        companyAPImgr.postNewCompany(newCompany)
    // .then(() => companyAPImgr.getAllCompanies())
    // .then(ac =>
    //     this.setState({
    //         companies: ac
    //     })
    // );

    // removeOwner = id => {
    //     return fetch(`http://localhost:5002/owners/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then(e => e.json())
    //         .then(() => fetch(`http://localhost:5002/owners`))
    //         .then(e => e.json())
    //         .then(owners => this.setState({
    //             owners: owners
    //         })
    //         )
    // }

    componentDidMount() {
        const newState = {};
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


            </div>
        )
    }
}

export default ApplicationViews