import React, { Component } from "react";
// import "./employees.css";

export default class TaskManager extends Component {
    // Set initial state
    state = {
        clientId: "",
        taskDesc: "",
        dueDate: "",
        isPriority: "",
        note: "",
        isComplete: ""
    };

    // Update state whenever an input field is edited (USED ALMOST EVERY TIME A FORM IS IN REACT!!!!)
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

    /*
          Local method for validation, creating animal object, and
          invoking the function reference passed from parent component
       */
    buildNewTask = evt => {
        evt.preventDefault();
        if (this.state.taskDesc === "") {
            window.alert("Please enter a task description.");
        } else if
            (this.state.dueDate === "") {
            window.alert("Please select a task due date.");
            } else {
            const newTask = {
                companyId: parseInt(sessionStorage.getItem("companyId")),
                clientId: this.state.clientId,
                taskDesc: this.state.taskDesc,
                dueDate: this.state.dueDate,
                isPriority: this.state.isPriority,
                note: this.state.note
            };

            console.log(newTask)

            this.props.newTask(newTask)
                .then(() => this.props.history.push("/taskManager"));
        };
    }

    render() {
        return (
            <React.Fragment>
                <h2>Task Manager</h2>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskDesc">Task Description</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="taskDesc"
                            placeholder="Description"
                        />
                        <br></br>
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="dueDate"
                            placeholder="Due Date"
                        />
                        <br></br>
                        <label htmlFor="requestType" placeholder="Request For"></label>
                        <select className="form-control"
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
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="note"
                            placeholder="Notes"
                        />
                        <br></br>
                        <label htmlFor="isPriority">Priority Task?</label>
                        <input
                            type="checkbox"
                            className="form-control"
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
            </React.Fragment>
        );
    }
}