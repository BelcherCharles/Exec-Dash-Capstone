import React, { Component } from "react"
import userAPImgr from "../../modules/userAPImgr"

export default class ClientEditForm extends Component {
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
    clientSince: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

    updateClient = evt => {
      evt.preventDefault()

      if (this.state.employee === "") {
        window.alert("Please select a caretaker");
      } else {
        const editedClient = {
          id: parseInt(this.props.match.params.clientId),
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          clientSince: this.state.clientSince,
          companyId: parseInt(sessionStorage.getItem("companyId")),
          userType: "client"
        };

    this.props.updateUser(editedClient, this.props.match.params.clientId)
    .then(() => this.props.history.push("/clientList"))
    // console.log(parseInt(this.props.match.params.employeeId))
    // console.log(editedEmployee)

    }
  }

  componentDidMount() {
    console.log(this.props.match.params.clientId)
    userAPImgr.getOneUser(this.props.match.params.clientId)
    .then(client => {
        this.setState({
          name: client.name,
          surname: client.surname,
          email: client.email,
          phone: client.phone,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: client.zip,
          clientSince: client.clientSince,


          // image: employee.image
        });
      });
  }


  render() {
    return (
      <React.Fragment>
        <h1 className="header">Client Edit Form</h1>
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
            <button
              type="submit"
              onClick={this.updateClient}
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