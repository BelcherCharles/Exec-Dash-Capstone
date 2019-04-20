import React, { Component } from "react";
// import "./employees.css";

export default class ClientForm extends Component {
    // Set initial state
    state = {
        firstName: "",
        surname: "",
        email: "",
        phone: "",
        deptId: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        // image: ""
    };

    // Update state whenever an input field is edited (USED ALMOST EVERY TIME A FORM IS IN REACT!!!!)
    handleFieldChange = evt => {
        //   console.log(evt)
        //   console.log(evt.target.value)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    buildNewClient = evt => {
        evt.preventDefault();
        if (this.state.department === "") {
            window.alert("Please select a department");
        } else {
            const newClient = {
                name: this.state.firstName,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                companyId: parseInt(sessionStorage.getItem("companyId")),
                clientSince: new Date(),
                userType: "client",
                image: this.state.image

                // department: this.state.department,
            };

            // console.log(newClient)
            //   debugger;
            // Create the animal and redirect user to animal list
            this.props.addUser(newClient)
                .then(() => this.props.history.push("/clientList"));

        };
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="header">Add New Client</h1>
                <form className="clientForm">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            required
                            className="search-form-control"
                            onChange={this.handleFieldChange}
                            id="firstName"
                            placeholder="First Name"
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
                        />
                        <br></br>
                        {/* <label htmlFor="image">Headshot</label>
                        <input
                            type="file"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="image"
                            placeholder="Image"
                        /> */}
                    </div>

                    <br></br>
                    <button type="submit" onClick={this.buildNewClient} className="btn btn-primary">
                        Add New Client
                    </button>
                </form>
            </React.Fragment>
        );
    }
}