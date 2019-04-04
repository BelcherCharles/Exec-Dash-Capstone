import React, { Component } from "react"
import './login.css'
import userAPImgr from "../../modules/userAPImgr";
import NavBar from "../nav/navBar";
import Capstone from '../capstone'


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        rememberMe: "",
        user: ""

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

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        userAPImgr.userLogin(this.state.email)
            .then(su => {
                console.log(su)
                if
                    (su.length < 1) {
                    window.alert("That user name was not found. Perhaps you'd like to register?")
                }
                else if (this.state.password !== su[0].password) {
                    window.alert("The password entered is not correct. Please try again.")
                }

                else if (this.state.password === su[0].password && this.state.rememberMe === true) {
                    this.props.handleLogin()
                    localStorage.setItem("userId", su[0].id)
                    localStorage.setItem("companyId", su[0].companyId)
                    sessionStorage.setItem("userId", su[0].id)
                    sessionStorage.setItem("companyId", su[0].companyId)
                    // this.goBack()
                    if (su[0].isAdmin === true) {
                        sessionStorage.setItem("isAdmin", true)
                        this.props.history.push("/execLandingPage")

                    }
                    else {
                        sessionStorage.setItem("isAdmin", false)
                        this.props.history.push("/employeeLandingPage")

                    }
                } else {
                    this.props.handleLogin()
                    sessionStorage.setItem("userId", su[0].id)
                    sessionStorage.setItem("companyId", su[0].companyId)
                    // this.goBack()
                    if (su[0].isAdmin === true) {
                        sessionStorage.setItem("isAdmin", true)
                        this.props.history.push("/execLandingPage")
                    }
                    else {
                        sessionStorage.setItem("isAdmin", false)
                        this.props.history.push("/empLandingPage")
                    }
                }
            })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <h1>Widget World</h1>
                    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                    <br></br>
                    <label htmlFor="inputEmail">
                        Email address
                </label>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        required="" autoFocus="" />
                    <br></br>
                    <label htmlFor="inputPassword">
                        Password
                </label>
                    <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                    <br></br>
                    <label htmlFor="rememberMe">
                        Remember Me
                </label>
                    <input onChange={this.handleCheckbox} type="checkbox"
                        id="rememberMe"
                        placeholder=""
                        required="" autoFocus="" />
                    <br></br>
                    <br></br>
                    <button type="submit">
                        Sign in
                </button>
                </form>
                <section>
                    <br></br>
                    <h2>-or-</h2>
                    <br></br>
                    <button type="register" onClick={() => this.props.history.push("/regNewCompany")}
                        id="newCompanyReg">
                        Register New Company
                </button>
                </section>
            </div >
        )
    }
}