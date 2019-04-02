import React, { Component } from "react"
import NavBar from "./nav/navBar"
import ApplicationViews from "./nav/applicationViews"
import {withRouter} from 'react-router-dom';
// import auth0Client from './authentication/auth'
// import "./kennel.css"
// import "bootstrap/dist/css/bootstrap.min.css"


export default class Capstone extends Component {
    state = {
        user: false,
    }
    // async componentDidMount() {
    //     if (this.props.location.pathname === '/callback') return;
    //     try {
    //       await auth0Client.silentAuth();
    //       this.forceUpdate();
    //     } catch (err) {
    //       if (err.error !== 'login_required') console.log(err.error);
    //     }
    //   }

    handleLogin = () => {
        const newState = {}
        newState.user = true
        this.setState(newState)
    }


    handleLogout = () => {
    sessionStorage.clear()
        const newState = {}
        newState.user = false
        this.setState(newState)
    }

    render() {
        return (
            <React.Fragment>
                <NavBar capState={this.state} handleLogout={this.handleLogout}/>
                <ApplicationViews capState={this.state} handleLogin={this.handleLogin}/>
            </React.Fragment>
        )
    }
}

// export default withRouter(Kennel);