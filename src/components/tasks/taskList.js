import React, { Component } from "react";
import Modal from "react-responsive-modal";
import TaskCard from './taskCard'
import "./tasks.css";
import companyAPImgr from '../../modules/companyAPImgr'
// import { runInThisContext } from "vm";

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
        isComplete: "",
        taskSelector: "unassigned",
        // flag: ""
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
                userId: 0
            };

            // console.log(newTask)

            this.props.newTask(newTask)
                .then(() => this.onCloseModal())

            const newState = {
                clientId: "",
                taskDesc: "",
                dueDate: "",
                isPriority: "",
                note: "",
                type: "Sales",
                isComplete: "",
                taskSelector: "unassigned",
            }

            this.setState(newState)

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
                        Add New Task
                    </button>
                </div>
                <h4 className="sectionHeader">Show Tasks That Are:</h4>
                <section>
                    <select className="taskSelector" id="taskSelector" onChange={this.handleFieldChange}>
                        <option value="unassigned">Unassigned</option>
                        <option value="incomplete">Assigned / Not Completed</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                    </select>
                </section>

                <section className="tasks">
                    {
                        this.props.tasks.map(task => {
                            if (this.state.taskSelector === "unassigned" && task.userId === 0) {
                                return (
                                    <section>
                                        <br></br>
                                        <div key={task.id}>
                                            <TaskCard key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} assignTo={this.props.assignTo} {...this.props}
                                            // archiveTask={this.props.archiveTask}
                                            />
                                        </div>
                                    </section>
                                )
                            } else if (this.state.taskSelector === "incomplete" && task.userId !== 0 && task.isComplete == false) {
                                return (
                                    <section>
                                        <br></br>
                                        <div key={task.id}>
                                            <TaskCard key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} assignTo={this.props.assignTo} {...this.props}
                                            // archiveTask={this.props.archiveTask}
                                             />
                                        </div>
                                    </section>
                                )
                            } else if (this.state.taskSelector === "completed" && task.archived !== true && task.isComplete == true ) {
                                return (
                                    <section>
                                        <br></br>
                                        <div key={task.id}>
                                            <TaskCard key={task.id} task={task} route={"tasks"} deleteTask={this.props.deleteTask} assignTo={this.props.assignTo} archiveTask={this.props.archiveTask} reopenTask={this.props.reopenTask} {...this.props}
                                            />
                                        </div>
                                    </section>
                                )
                            } else if (this.state.taskSelector === "archived" && task.archived == true && task.isComplete == true) {
                                return (
                                    <section>
                                        <br></br>
                                        <div key={task.id}>
                                            <TaskCard key={task.id} task={task} route={"tasks"} {...this.props}
                                            // deleteTask={this.props.deleteTask} assignTo={this.props.assignTo} archiveTask={this.props.archiveTask}
                                            />
                                        </div>
                                    </section>
                                )
                            }
                        })}
                </section>

                <br></br>

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