import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
// import PropTypes from "prop-types"
import "./employees.css"

export default class EmployeeCard extends Component {

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }

        updateEmployee = evt => {
          evt.preventDefault()

        //   if (this.state.employee === "") {
        //     window.alert("Please select a caretaker");
        //   } else {
            const editedEmployee = {
              id: parseInt(this.props.match.params.employeeId),
              name: this.state.name,
              surname: this.state.surname,
              email: this.state.email,
              phone: this.state.phone,
              address: this.state.address,
              city: this.state.city,
              state: this.state.state,
              zip: this.state.zip,
              hireDate: this.state.hireDate,
              companyId: parseInt(sessionStorage.getItem("companyId")),
              userType: "employee",
              password: this.state.password
            };

        this.props.updateUser(editedEmployee, this.props.match.params.employeeId)
        .then(() => this.props.history.push("/employees"))
        // console.log(parseInt(this.props.match.params.employeeId))
        // console.log(editedEmployee)

        // }
      }


    render() {
        return (
            <div key={this.props.employee.id} className="empCard">
                <div className="empCardBody">
                    <h3 className="empCardTitle">
                        {/* <img src={this.props.employee.image} alt={this.props.employee.name} className="empImg" /> */}
                        <p>{this.props.employee.name} {this.props.employee.surname}</p>
                        <p>{this.props.employee.email}</p>
                        <p>{this.props.employee.phone}</p>
                        <p>{this.props.employee.address}</p>
                        <p>{this.props.employee.city}, {this.props.employee.state} {this.props.employee.zip}</p>
                        {/* <p>{this.props.employee.id}</p> */}

                        <button className="btn btn-primary" onClick={() => this.props.history.push(`/employees/${this.props.employee.id}/edit`)} >Edit Employee</button>

                        <br></br>
                        <button onClick={() => this.props.deleteEmp(this.props.employee.id)}
                            className="btn btn-danger">Fire Employee
                        </button>
                    </h3>
                </div>
            </div>
        )
    }
}

{/* // EmployeeCard.propTypes = {
//     employee: PropTypes.shape ({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         department: PropTypes.string
//     })
// }

// export default EmployeeCard */}