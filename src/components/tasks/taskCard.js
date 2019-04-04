import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import companyAPImgr from "../../modules/companyAPImgr";
// import PropTypes from "prop-types"
// import "./employees.css"



export default class TaskCard extends Component {

    state = {
        assignTo: ""
    }

    assignTo = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(this.props.task.id)
        console.log(evt.target.value)
        companyAPImgr.assignTask(this.props.task.id, evt.target.value)
    }

render() {
    return (
        <div key={this.props.task.id} className="taskCard">
            <div className="taskCardBody">
                <h3 className="taskCardTitle">
                    <p>{this.props.task.taskDesc}</p>
                    <p>{this.props.task.dueDate}</p>
                    <p>{this.props.task.note}</p>

                    <label htmlFor="assignTo" placeholder="Assign To">Assign To</label>
                    <select className="form-control"
                        onInput={this.assignTo}
                        id="assignTo" placeholder="Assign To">
                        <option value="" selected>Employee:</option>
                        {this.props.employees.map(employee => (
                            <option key={employee.id} id={employee.id} value={employee.id}>
                                {employee.name} {employee.surname}
                            </option>
                        ))}
                    </select>


                    <br></br>

                    <button className="btn btn-primary" onClick={() => this.props.history.push(`/tasks/${this.props.task.id}/edit`)}>Edit Task</button>
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