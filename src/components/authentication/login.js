import React, { Component } from "react"
// import './login.css'


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        rememberMe: ""
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


            /*
                For now, just store the email and password that
                the customer enters into local storage.
            */
            if (this.state.rememberMe === true) {
                localStorage.setItem(
                    "userId",
                    JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    }))
                sessionStorage.setItem(
                    "userId",
                    JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    }))
                this.goBack()
            } else {
                sessionStorage.setItem(
                    "userId",
                    JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    }))
                this.goBack()
            }
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
                <button type="submit">
                    Sign in
                </button>
            </form>
            <section>
            <br></br>
            <h2>-or-</h2>
            <br></br>
                <button type="register" onClick={() => this.props.history.push("/regNewUser")}
                id="newUserReg">
                    Register New User
                </button>
            </section>
            </div>
        )
    }
}