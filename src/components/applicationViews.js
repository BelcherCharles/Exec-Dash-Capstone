import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Login from './authentication/login'
// import Callback from '../authentication/callBack'
// import RegNewUser from '../authentication/newUserReg'
// import ResourceList from '../generics/resourceList'
// import Auth0Client from "../authentication/auth"

class ApplicationViews extends Component {


    state = {
        users: [],
        clients: [],
        tasks: [],
        requests: [],
        empTasks: []
    }



    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("userId") !== null

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

    // addEmployee = employee =>
    //     animalAPIManager.postEmployee(employee)
    //         .then(() => animalAPIManager.getAllEmployees())
    //         .then(employees =>
    //             this.setState({
    //                 employees: employees
    //             })
    //         );

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

    // addOwner = owner =>
    //     animalAPIManager.postOwner(owner)
    //         .then(() => animalAPIManager.getAllOwners())
    //         .then(owners =>
    //             this.setState({
    //                 owners: owners
    //             })
    //         );

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


            </div>
        )
    }
}

export default ApplicationViews