import React, { Component } from "react"
import userAPImgr from "../../modules/userAPImgr"
import './employees.css'

export default class EmployeeEditForm extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    image: "",
    hireDate: "",
    password: "",
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateEmployee = evt => {
    evt.preventDefault()

    if (this.state.name === "") {
      window.alert("Please enter the employee's first name");
    } else if (this.state.surname === "") {
      window.alert("Please enter the employee's first name")
    } else if (this.state.email === "") {
      window.alert("Please enter the employee's email address")
    } else if (this.state.phone === "") {
      window.alert("Please enter the employee's phone #")
    } else {
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

    }
  }

  componentDidMount() {
    // console.log(this.props.match.params.employeeId)
    userAPImgr.getOneUser(this.props.match.params.employeeId)
      .then(employee => {
        this.setState({
          name: employee.name,
          surname: employee.surname,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          city: employee.city,
          state: employee.state,
          zip: employee.zip,
          hireDate: employee.hireDate,
          password: employee.password,
          userType: employee.userType



          // image: employee.image
        });
      });
  }


  render() {
    return (
      <React.Fragment>
        <h1 className="header">Edit Employee Form</h1>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="First Name"
              value={this.state.name}
            />
            <br></br>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="surname"
              placeholder="Surname"
              value={this.state.surname}
            />
            <br></br>
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="email"
              placeholder="Email"
              value={this.state.email}
            />
            <br></br>
            <label htmlFor="phone">Phone #</label>
            <input
              type="tel"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="phone"
              placeholder="Phone #"
              value={this.state.phone}
            />
            <br></br>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="address"
              placeholder="Street Address"
              value={this.state.address}
            />
            <br></br>
            <label htmlFor="city">City</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="city"
              placeholder="City"
              value={this.state.city}
            />
            <br></br>
            <label htmlFor="state">State</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="state"
              placeholder="State"
              value={this.state.state}
            />
            <br></br>
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="zip"
              placeholder="Zip Code"
              value={this.state.zip}
            />
            <br></br>
            {/* <label htmlFor="image">Headshot</label>
            <input
              type="file"
              required
              className="search-form-control"
              onChange={this.handleFieldChange}
              id="image"
              placeholder="Image"
              value={this.state.image}
            /> */}
            <button
              type="submit"
              onClick={this.updateEmployee}
              className="btn btn-primary"
            >
              Submit
           </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}