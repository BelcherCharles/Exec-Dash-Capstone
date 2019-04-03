import React, { Component } from "react"
import { Link } from "react-router-dom"
import TaskCard from './empTasks/empTaskCard'

import PropTypes from "prop-types"
import userAPImgr from '../../modules/userAPImgr'
import "../executives/landingPage.css"

export default class EmpLandingPage extends Component {

    // state = {
    //     users: [],
    //     tasks: [],
    //     empTasks: [],
    //     departments: [],
    // }

    // componentDidMount() {
    //     const newState = {};
    //     userAPImgr.getAllUsers()
    //         .then(pau => {
    //             newState.users = pau
    //             this.setState(newState)
    //         })
    // }

    render() {
        return (
            <React.Fragment>
                <h1 className="header">Employee Landing Page</h1>
                <br></br>
                <h3 className="centered">Here's Your Tasks</h3>
                <section className="tasks">
                    {
                        this.props.tasks.map(task => {
                            console.log(task)
                            return (
                                <div key={task.id}>
                                    <TaskCard key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} {...this.props} />
                                </div>
                            )
                        }
                        )
                    }
                </section>

                <Link className="nav-link" to={`/employees`}>Employee Manager</Link>

                <Link className="nav-link" to={`/taskManager`}>Task Manager</Link>

                <Link className="nav-link" to={`/clientList`}>Client List</Link>

            </React.Fragment>
        )
    }
}