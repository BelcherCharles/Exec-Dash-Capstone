import React, { Component } from "react"
import { Link } from "react-router-dom"

import PropTypes from "prop-types"
import userAPImgr from '../../modules/userAPImgr'
import "./landingPage.css"

export default class ExecLandingPage extends Component {

    state = {
        users: [],
        tasks: [],
        empTasks: [],
        departments: [],
    }

    componentDidMount() {
        const newState = {};
        userAPImgr.getAllUsers()
            .then(pau => {
                newState.users = pau
                this.setState(newState)
            })
    }
    //     return animalAPIManager.getAllLocations();
    // })
    // .then(parsedLocations => {
    //     newState.locations = parsedLocations;
    //     return animalAPIManager.getAllOwners();
    // })
    // .then(parsedOwners => {
    //     newState.owners = parsedOwners;
    //     return animalAPIManager.getAllAnimals();
    // })
    // .then(parsedAnimals => {
    //     // console.log(parsedAnimals)
    //     newState.animals = parsedAnimals;
    //     return animalAPIManager.getAllOwners();
    // })
    // .then((parsedAnimalOwners) => {
    //     newState.animalOwners = parsedAnimalOwners;
    //     return animalAPIManager.getAllSpecies();
    // })
    // .then(parsedSpecies => {
    //     newState.species = parsedSpecies


    render() {
        return (
            <React.Fragment>
                <h1 className="header">Executive Landing Page</h1>

                <Link className="nav-link" to={`/employees`}>Employee Manager</Link>

                <Link className="nav-link" to={`/taskManager`}>Task Manager</Link>

                <Link className="nav-link" to={`/clientList`}>Client List</Link>

            </React.Fragment>
        )
    }
}

