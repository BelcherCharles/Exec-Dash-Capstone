import React, { Component } from "react";
import "./tasks.css";

export default class TaskForm extends Component {
    // Set initial state
    state = {
        clientId: "",
        taskDesc: "",
        dueDate: "",
        isPriority: "",
        note: "",
        type: "",
        isComplete: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleCheckbox = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.checked;
        this.setState(stateToChange)
    }

    buildNewTask = evt => {
        evt.preventDefault();

            const newTask = {
                taskDesc: this.state.taskDesc,
                dueDate: this.state.dueDate,
                note: this.state.note,
                isPriority: this.state.isPriority,
                isComplete: false,
                type: this.state.type,
                companyId: parseInt(sessionStorage.getItem("companyId"))
            };

            console.log(newTask)
            this.props.addTask(newTask)
                .then(() => this.props.history.push("/taskManager"));

        };


    render() {
        return (
            <React.Fragment>
                <h1 className="header">Add A New Task</h1>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskDesc">Task Description</label>
                        <input
                            type="text"
                            required
                            className="search-form-control"
                            onChange={this.handleFieldChange}
                            id="taskDesc"
                            placeholder="Description"
                        />
                        <br></br>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            required
                            className="search-form-control"
                            onChange={this.handleFieldChange}
                            id="dueDate"
                            placeholder="Due Date"
                        />
                        <br></br>
                        <label htmlFor="requestType" placeholder="Request For">Request Type</label>
                        <select className="search-form-control"
                            onChange={this.handleFieldChange}
                            id="type">
                            <option value="Sales">Sales</option>
                            <option value="Service">Service</option>
                            <option value="General Info">General Info</option>
                            <option value="Finance">Finance</option>
                        </select>
                        <br></br>
                        <label htmlFor="note">Notes</label>
                        <input
                            type="textarea"
                            required
                            className="search-form-control"
                            onChange={this.handleFieldChange}
                            id="note"
                            placeholder="Notes"
                        />
                        <br></br>
                        <label htmlFor="isPriority">Priority Task?</label>
                        <input
                            type="checkbox"
                            className="search-form-control"
                            onChange={this.handleCheckbox}
                            id="isPriority">
                        </input>
                    </div>
                    <br></br>
                    <button
                        type="submit"
                        onClick={this.buildNewTask}
                        className="btn btn-primary"
                    >
                        Add New Task
                    </button>
                </form>
            </React.Fragment >
        );
    }
}