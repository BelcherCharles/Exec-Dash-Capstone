import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Modal from "react-responsive-modal";
import companyAPImgr from "../../modules/companyAPImgr";
// import PropTypes from "prop-types"
import "./tasks.css"

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default class TaskCard extends Component {

    state = {
        open: false,
        companyId: "",
        clientId: "",
        taskDesc: "",
        dueDate: "",
        isPriority: "",
        note: "",
        type: "",
        isComplete: "",

    }

    onOpenModal = () => {
        companyAPImgr.getOneTask(this.props.task.id)
            .then(task => {
                console.log(task)
                this.setState({
                    userId: task.userId,
                    companyId: task.companyId,
                    taskDesc: task.taskDesc,
                    dueDate: task.dueDate,
                    isPriority: task.isPriority,
                    note: task.note,
                    type: task.type,
                    isComplete: task.isComplete,
                    open: true
                })
            })
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    handleFieldChange = evt => {
        const updatedState = {
            ...this.state, // This is called the spread operator
            [evt.target.id]: evt.target.value
        }
        this.setState(updatedState)
    }

    handleCheckbox = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }

    assignTo = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        this.props.assignTo(this.props.task.id, evt.target.value)
        // this.props.setState({flag: evt.target.value})
    }

    updateTask = evt => {
        evt.preventDefault()

        if (this.state.taskDesc === "") {
            window.alert("Please input a description of the task.")
        } else if (this.state.dueDate === "") {
            window.alert("Please choose a task due date.")
        } else if (this.state.type === "") {
            window.alert("Please choose a task type.")
        } else {
            const editedTask = {
                userId: parseInt(this.state.userId),
                id: parseInt(this.props.task.id),
                taskDesc: this.state.taskDesc,
                dueDate: this.state.dueDate,
                isPriority: this.state.isPriority,
                note: this.state.note,
                type: this.state.type,
                isComplete: this.state.isComplete,
                companyId: this.state.companyId
            };

            console.log(editedTask)
            this.props.updateTask(editedTask, this.props.task.id)
                .then(() => this.onCloseModal())

            // this.props.history.push("/taskManager"))
        }
    }

    render() {
        const { open } = this.state;
        if (this.props.task.archived === true) {
            return (
                <React.Fragment>
                    <div key={this.props.task.id} className="taskCard">
                        <div className="taskCardBody">
                            <h3 className="taskCardTitle">
                                <p>{this.props.task.taskDesc}</p>
                                <p>{this.props.task.type}</p>
                                <p>{this.props.task.dueDate}</p>
                                <p>{this.props.task.note}</p>

                                <p>Completed By:</p>
                                <p>{this.props.task.user.name} {this.props.task.user.surname}</p>
                            </h3>
                        </div>
                    </div>
                </React.Fragment >
            )
        } else if (this.props.task.isComplete === true && this.props.task.archived !== true) {
            return (
                <React.Fragment>
                    <div key={this.props.task.id} className="taskCard">
                        <div className="taskCardBody">
                            <h3 className="taskCardTitle">
                                <p>{this.props.task.taskDesc}</p>
                                <p>{this.props.task.type}</p>
                                <p>{this.props.task.dueDate}</p>
                                <p>{this.props.task.note}</p>

                                <p>Completed By:</p>
                                <p>{this.props.task.user.name} {this.props.task.user.surname}</p>

                                <br></br>

                                <button className="btn btn-primary taskBtn" onClick={() => this.props.reopenTask(this.props.task.id)}>
                                    Re-Open Issue</button>
                                {/* <br></br> */}
                                <button onClick={() => this.props.archiveTask(this.props.task.id)}
                                    className="btn btn-danger taskBtn">Archive Task
                                </button>
                            </h3>
                        </div>
                    </div>
                </React.Fragment >
            )
        }
        else if (this.props.task.isPriority === true) {
            return (
                <React.Fragment>
                    <div key={this.props.task.id} className="priorityTaskCard">
                        <div className="taskCardBody">
                            <h3 className="taskCardTitle">
                                <p>{this.props.task.taskDesc}</p>
                                <p>{this.props.task.type}</p>
                                <p>{this.props.task.dueDate}</p>
                                <p>{this.props.task.note}</p>

                                <label htmlFor="assignTo" className="assignToLabel">Assign To</label>
                                <select className="form-control"
                                    onChange={this.assignTo}
                                    id="assignTo" >

                                    {this.props.task.userId === 0
                                        ? <option value="0">Assign To:</option>
                                        : ""}

                                    {this.props.employees.map(employee => (
                                        <option
                                            key={employee.id}
                                            id={employee.id}
                                            value={employee.id}
                                            selected={employee.id === this.props.task.userId}
                                        >
                                            {employee.name} {employee.surname}
                                        </option>
                                    ))
                                    };
                                     </select>

                                <br></br>

                                <button className="btn btn-primary taskBtn" onClick={this.onOpenModal}>
                                    {/* {() => this.props.history.push(`/tasks/${this.props.task.id}/edit`)} */}
                                    Edit Task</button>
                                {/* <br></br> */}
                                <button onClick={() => this.props.deleteTask(this.props.task.id)}
                                    className="btn btn-danger taskBtn">Delete Task
                        </button>
                            </h3>
                        </div>
                    </div>
                    <div style={styles}>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2 className="editHeader">Edit Task Info.</h2>
                            <form className="taskForm">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="taskDesc"
                                        placeholder="Description"
                                        value={this.state.taskDesc}
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
                                        value={this.state.dueDate}
                                    />
                                    <br></br>
                                    <label htmlFor="requestType" placeholder="Request For"></label>
                                    <select className="form-control" value={this.state.type}
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
                                        // required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="note"
                                        placeholder="Notes"
                                        value={this.state.note}
                                    />
                                    <br></br>
                                    <label htmlFor="isPriority">Priority Task?</label>
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        onChange={this.handleCheckbox}
                                        id="isPriority"
                                        checked={this.state.isPriority}>
                                    </input>
                                    <br></br>
                                    <button type="submit" onClick={this.updateTask} className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div key={this.props.task.id} className="taskCard">
                        <div className="taskCardBody">
                            <h3 className="taskCardTitle">
                                <p>{this.props.task.taskDesc}</p>
                                <p>{this.props.task.type}</p>
                                <p>{this.props.task.dueDate}</p>
                                <p>{this.props.task.note}</p>

                                <label htmlFor="assignTo" className="assignToLabel">Assign To</label>
                                <select className="form-control"
                                    onChange={this.assignTo}
                                    id="assignTo" >

                                    {this.props.task.userId === 0
                                        ? <option value="0">Assign To:</option>
                                        : ""}

                                    {this.props.employees.map(employee => (
                                        <option
                                            key={employee.id}
                                            id={employee.id}
                                            value={employee.id}
                                            selected={employee.id === this.props.task.userId}
                                        >
                                            {employee.name} {employee.surname}
                                        </option>
                                    ))
                                    };
                                    </select>

                                <br></br>

                                <button className="btn btn-primary taskBtn" onClick={this.onOpenModal}>
                                    {/* {() => this.props.history.push(`/tasks/${this.props.task.id}/edit`)} */}
                                    Edit Task</button>
                                {/* <br></br> */}
                                <button onClick={() => this.props.deleteTask(this.props.task.id)}
                                    className="btn btn-danger taskBtn">Delete Task
                        </button>
                            </h3>
                        </div>
                    </div>
                    <div style={styles}>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2 className="editHeader">Edit Task Info.</h2>
                            <form className="taskForm">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="taskDesc"
                                        placeholder="Description"
                                        value={this.state.taskDesc}
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
                                        value={this.state.dueDate}
                                    />
                                    <br></br>
                                    <label htmlFor="requestType" placeholder="Request For"></label>
                                    <select className="form-control" value={this.state.type}
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
                                        // required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="note"
                                        placeholder="Notes"
                                        value={this.state.note}
                                    />
                                    <br></br>
                                    <label htmlFor="isPriority">Priority Task?</label>
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        onChange={this.handleCheckbox}
                                        id="isPriority"
                                        checked={this.state.isPriority}>
                                    </input>
                                    <br></br>
                                    <button type="submit" onClick={this.updateTask} className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </React.Fragment >
            )
        }
    }
}