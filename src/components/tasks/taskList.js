import React, { Component } from "react";
import TaskCard from './taskCard'
import "./tasks.css";

export default class TaskList extends Component {
    // Set initial state
    // state = {
    //     clientId: "",
    //     taskDesc: "",
    //     dueDate: "",
    //     isPriority: "",
    //     note: "",
    //     isComplete: ""
    // };

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
                <div className="addTaskButton">
                    <button type="button"
                        className="btn btn-success" id="addTaskBtn"
                        onClick={() => {
                            this.props.history.push("/tasks/new")
                        }
                        }>
                        Add New Task
                    </button>
                </div>
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
            </React.Fragment>
        );
    }
}