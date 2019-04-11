import React, { Component } from "react";
import Modal from "react-responsive-modal";
import TaskCard from './taskCard'
import "./tasks.css";
import { runInThisContext } from "vm";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

export default class TaskList extends Component {
    state = {
        open: false,
        clientId: "",
        taskDesc: "",
        dueDate: "",
        isPriority: "",
        note: "",
        type: "Sales",
        isComplete: ""
    }

    onOpenModal = () => {
        this.setState({ open: true });
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
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.checked;
        this.setState(stateToChange)
    }

    buildNewTask = evt => {
        evt.preventDefault();
        if (this.state.taskDesc === "") {
            window.alert("Please enter a task description.");
        } else if (this.state.dueDate === "") {
            window.alert("Please select a task due date.");
        } else if (this.state.type === "") {
            window.alert("Please select a task type.")
        } else {
            const newTask = {
                companyId: parseInt(sessionStorage.getItem("companyId")),
                clientId: this.state.clientId,
                taskDesc: this.state.taskDesc,
                dueDate: this.state.dueDate,
                type: this.state.type,
                isPriority: this.state.isPriority,
                isComplete: false,
                note: this.state.note,
                userId: ""
            };

            // console.log(newTask)

            this.props.newTask(newTask)
                .then(() => this.onCloseModal())
            // () => this.props.history.push("/taskManager"));
        };
    }

    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <h1 className="header">Task Manager</h1>
                <div className="addTaskButton">
                    <button type="button"
                        className="btn btn-success" id="addTaskBtn"
                        onClick={this.onOpenModal}>
                        {/* {() => {this.props.history.push("/tasks/new")}}> */}
                        Add New Task
                    </button>
                </div>
                <h3 className="sectionHeader">Unassigned Tasks</h3>
                <section className="tasks">
                    {
                        this.props.tasks.map(task => {
                            if (task.userId === "") {
                                return (
                                    <div key={task.id}>
                                        <TaskCard className="priority" key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} {...this.props} />
                                    </div>
                                )
                            } else {

                    }})}
                </section>
                <br></br>
                <h3 className="sectionHeader">Completed / To Be Reviewed</h3>
                <section className="tasks">
                    {
                        this.props.tasks.map(task => {
                            if (task.isComplete === true) {
                                return (
                                    <div key={task.id}>
                                        <TaskCard className="priority" key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} {...this.props} />
                                    </div>
                                )
                            } else {

                    }})}
                </section>

                <div style={styles}>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2 className="editHeader">Enter New Task Info.</h2>
                        <form className="taskForm">
                            <div className="form-group">
                                <label htmlFor="taskDesc">Task Description</label>
                                <input
                                    type="text"
                                    required
                                    className="task-form-control"
                                    onChange={this.handleFieldChange}
                                    id="taskDesc"
                                    placeholder="Description"

                                />
                                <br></br>
                                <label htmlFor="dueDate">Due Date</label>
                                <input
                                    type="date"
                                    required
                                    className="task-form-control"
                                    onChange={this.handleFieldChange}
                                    id="dueDate"
                                    placeholder="Due Date"

                                />
                                <br></br>
                                <label htmlFor="type" >Request For:</label>
                                <select className="task-form-control"
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
                                    className="task-form-control"
                                    onChange={this.handleFieldChange}
                                    id="note"
                                    placeholder="Notes"
                                />
                                <br></br>
                                <label htmlFor="isPriority">Priority Task?</label>
                                <input
                                    type="checkbox"
                                    className="task-form-control"
                                    onChange={this.handleCheckbox}
                                    id="isPriority"
                                >
                                </input>
                                <br></br>
                                <br></br>
                                <button type="submit" onClick={this.buildNewTask} className="btn btn-primary">
                                    Submit
                                    </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}