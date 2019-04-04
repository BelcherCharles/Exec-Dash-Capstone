import React, { Component } from "react"
import companyAPImgr from "../../modules/companyAPImgr"

export default class TaskEditForm extends Component {
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
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleCheckbox = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }

    updateEmployee = evt => {
        evt.preventDefault()

        if (this.state.employee === "") {
            window.alert("Please select a caretaker");
        } else {
            const editedTask = {
                id: parseInt(this.props.match.params.taskId),
                taskDesc: this.state.taskDesc,
                dueDate: this.state.dueDate,
                isPriority: this.state.isPriority,
                note: this.state.note,
                type: this.state.type,
                isComplete: "",
                companyId: parseInt(sessionStorage.getItem("companyId"))
            };

            this.props.updateTask(editedTask, this.props.match.params.taskId)
                .then(() => this.props.history.push("/taskManager"))
            // console.log(parseInt(this.props.match.params.employeeId))
            // console.log(editedEmployee)

        }
    }

    componentDidMount() {
        console.log(this.props.match.params.taskId)
        companyAPImgr.getOneTask(this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    taskDesc: task.taskDesc,
                    dueDate: task.dueDate,
                    isPriority: task.isPriority,
                    note: task.note,
                    type: task.type,
                    isComplete: task.isComplete

                    // image: employee.image
                });
            });
    }


    render() {
        return (
            <React.Fragment>
                <h1 className="header"> Task Edit Form </h1>
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
                            ))}
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
                            value={this.state.note}
                        />
                        <br></br>
                        <label htmlFor="isPriority">Priority Task?</label>
                        <input
                            type="checkbox"
                            className="form-control"
                            onChange={this.handleCheckbox}
                            id="isPriority"
                            value={this.state.isPriority}>
                        </input>
                    </div>
                    <br></br>
                    <button type="submit" onClick={this.updateEmployee} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment >
        );
    }
}