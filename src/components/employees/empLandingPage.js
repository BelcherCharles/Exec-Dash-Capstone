import React, { Component } from "react"
import { Link } from "react-router-dom"
import TaskCard from './empTasks/empTaskCard'

import PropTypes from "prop-types"
import userAPImgr from '../../modules/userAPImgr'
import "../executives/landingPage.css"

export default class EmpLandingPage extends Component {

    render() {
        return (
            <React.Fragment>
                <h1 className="header">Employee Landing Page</h1>
                <br></br>
                <h3 className="centered">Here's Your Tasks</h3>
                <br></br>
                <section className="tasks">
                    {
                        this.props.empTasks.map(task => {
                            // console.log(task)
                            return (
                                <div key={task.id}>
                                    <TaskCard key={task.id} task={task} route={"tasks"} markTaskComp={this.props.markTaskComp} {...this.props} />
                                </div>
                            )
                        }
                        )
                    }
                </section>

                <Link className="nav-link" to={`/employees`}>Employee Manager</Link>

                <Link className="nav-link" to={`/clientList`}>Client List</Link>

            </React.Fragment>
        )
    }
}