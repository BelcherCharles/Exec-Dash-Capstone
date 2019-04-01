import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import PropTypes from "prop-types"
// import "./employees.css"

export default class TaskCard extends Component {
    render() {
        return (
            <div key={this.props.tasks.id} className="taskCard">
                <div className="taskCardBody">
                    <h3 className="taskCardTitle">
                        <p>{this.props.task.taskDesc}</p>
                        <p>{this.props.task.dueDate}</p>

                       <button className="btn btn-primary"  onClick={() => this.props.history.push(`/tasks/${this.props.task.id}/edit`)}>Edit Task</button>
                        <br></br>
                        <button onClick={() => this.props.deleteTask(this.props.task.id)}
                            className="btn btn-danger">Delete Task
                        </button>
                    </h3>
                </div>
            </div>
        )
    }
}