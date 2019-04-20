import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import companyAPImgr from "../../../modules/companyAPImgr";
// import PropTypes from "prop-types"
// import "./employees.css"

export default class TaskCard extends Component {

    // markTaskComp = () => {
    //     console.log(this.props.task.id)
    //     return companyAPImgr.markTaskComp(this.props.task.id)
    // }
    render() {
        if (this.props.task.isPriority === true) {
            return (
                <div key={this.props.task.id} className="priorityTaskCard">
                    <div className="taskCardBody">
                        <h3 className="taskCardTitle">
                            <p>{this.props.task.taskDesc}</p>
                            <p>{this.props.task.dueDate}</p>

                            <button className="btn btn-primary" onClick={() => this.props.markTaskComp(this.props.task.id)}>Mark Completed</button>
                            {/* this.props.history.push(`/tasks/${this.props.task.id}/edit`) */}
                            <br></br>
                            {/* <button onClick={() => this.props.deleteTask(this.props.task.id)}
                            className="btn btn-danger">Delete Task
                        </button> */}
                        </h3>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={this.props.task.id} className="taskCard">
                    <div className="taskCardBody">
                        <h3 className="taskCardTitle">
                            <p>{this.props.task.taskDesc}</p>
                            <p>{this.props.task.dueDate}</p>

                            <button className="btn btn-primary" onClick={() => this.props.markTaskComp(this.props.task.id)}>Mark Completed</button>
                            {/* this.props.history.push(`/tasks/${this.props.task.id}/edit`) */}
                            <br></br>
                            {/* <button onClick={() => this.props.deleteTask(this.props.task.id)}
                            className="btn btn-danger">Delete Task
                        </button> */}
                        </h3>
                    </div>
                </div>
            )
        }
    }
}