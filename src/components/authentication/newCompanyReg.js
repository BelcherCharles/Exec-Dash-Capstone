import React, { Component } from "react"
import companyAPImgr from '../../modules/companyAPImgr'
import userAPImgr from '../../modules/userAPImgr'
// import InputMask from 'react-input-mask';
import './login.css'


export default class NewCompanyReg extends Component {

    // Set initial state
    state = {
        companyName: "",
        userFirstName: "",
        userSurname: "",
        userPhone: "",
        userEmail: "",
        userPassword: "",
        companyId: "",
        hireDate: "",
        isAdmin: "",
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        // console.log(evt.target.checked)
        // console.log(evt.target.id)
        this.setState(stateToChange)
    }

    handleCheckbox = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }

    goBack() {
        window.history.back();
    }

    handleRegister = (e) => {
        e.preventDefault()

        if (this.state.companyName === "") {
            window.alert("Please enter your company's name")
        }
        else if (this.state.userFirstName === "") {
            window.alert("Please enter your admin's first name.");
        } else if
            (this.state.userSurname === "") {
            window.alert("Please enter your admin's last name.")
        } else if
            (this.state.userEmail === "") {
            window.alert("Please enter your admin's email address.")
        } else if
            (this.state.userPhone === "") {
            window.alert("Please enter your admin's phone number.")
        } else if
            (this.state.userPassword === "") {
            window.alert("Please choose a new password")
        } else if
            (this.state.passwordCheck !== this.state.userPassword) {
            window.alert("Please make sure your password and password check match.")
        }

        else {
            const newCompany = {
                companyName: this.state.companyName,
            }

            // this.props.addCompany
            companyAPImgr.postNewCompany(newCompany)
                .then(pnc => {
                    console.log(pnc)

                    const newUser = {
                        name: this.state.userFirstName,
                        surname: this.state.userSurname,
                        phone: this.state.userPhone,
                        email: this.state.userEmail,
                        password: this.state.userPassword,
                        companyId: parseInt(pnc.id),
                        hireDate: new Date(),
                        userType: "employee",
                        isAdmin: true,
                        deptId: 1
                    }

                    console.log(newUser)
                    userAPImgr.postNewUser(newUser)
                        .then(nu => {
                            sessionStorage.setItem("userId", nu.id)
                            sessionStorage.setItem("companyId", pnc.id)
                            sessionStorage.setItem("isAdmin", true)
                        })

                    .then(() => this.props.history.push("/execLandingPage"));
                })
        };
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1>Widget World</h1>
                <h2 className="h3 mb-3 font-weight-normal">Register New Company</h2>
                <br></br>

                <label htmlFor="companyName">
                    Company Name
                </label>
                <input onChange={this.handleFieldChange} type="text"
                    id="companyName"
                    placeholder="Company Name"
                    required="" autoFocus="" />
                <br></br>
                <h2 className="h3 mb-3 font-weight-normal">Executive Information</h2>

                <label htmlFor="adminFirstName">
                    Admin's First Name
                </label>
                <input onChange={this.handleFieldChange} type="text"
                    id="userFirstName"
                    placeholder="Admin's First Name"
                    required="" autoFocus="" />
                <br></br>

                <label htmlFor="adminSurname">
                    Admin's Surname
                </label>
                <input onChange={this.handleFieldChange} type="text"
                    id="userSurname"
                    placeholder="Admin's Surname"
                    required="" autoFocus="" />
                <br></br>


                <label htmlFor="adminEmail">
                    Admin Email
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="userEmail"
                    placeholder="Admin Email"
                    required="" />
                <br></br>

                <label htmlFor="adminPhone">
                    Admin Phone Number
                </label>
                <input onChange={this.handleFieldChange} type="tel"
                    id="userPhone"
                    placeholder="Phone Number"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required=""
                />
                <br></br>
                <label htmlFor="adminPassword">
                    Enter Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="userPassword"
                    placeholder="Password"
                    pattern=".{6,12}"
                    required title="6 to 12 characters, please"
                // required=""
                />
                <br></br>
                <label htmlFor="passwordCheck">
                    Re-Enter Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="passwordCheck"
                    placeholder="Re-enter password"
                // required=""
                />
                <br></br>
                <br></br>

                <button type="submit">
                    Register New Company
                </button>
            </form>

        )
    }
}