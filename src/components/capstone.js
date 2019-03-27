import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
import ApplicationViews from "./applicationViews"
import {withRouter} from 'react-router-dom';
// import auth0Client from './authentication/auth'
// import "./kennel.css"
// import "bootstrap/dist/css/bootstrap.min.css"


export default class Capstone extends Component {
    // async componentDidMount() {
    //     if (this.props.location.pathname === '/callback') return;
    //     try {
    //       await auth0Client.silentAuth();
    //       this.forceUpdate();
    //     } catch (err) {
    //       if (err.error !== 'login_required') console.log(err.error);
    //     }
    //   }

    render() {
        return (
            <React.Fragment>
                {/* <NavBar /> */}
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

// export default withRouter(Kennel);