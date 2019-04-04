import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './navBar.css'


class NavBar extends Component {
    state = {
        user: ""
    }

    isAuthenticated = () => sessionStorage.getItem("userId") !== null && sessionStorage.getItem("companyId") !== null

    // handleLogout = () => {
    //     sessionStorage.clear()
    //     const newState = {}
    //         newState.user = false
    //         this.setState(newState)
    // }

    render() {
        // console.log(this.props.location)
        if (this.props.capState.user === false && this.props.location.pathname === "/") {
            return (
                <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow opaqueNav">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/RegNewCompany">Register Company</Link>
                        </li>
                    </ul>
                </nav>
            )
        } else if (this.props.capState.user === false && this.props.location.pathname === "/RegNewCompany") {
            return (
                <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow opaqueNav">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Login</Link>
                        </li>
                    </ul>
                </nav>
            )
        } else {
            if (sessionStorage.getItem("isAdmin") === true) {
        //(this.props.capState === true  && sessionStorage.getItem("isAdmin") === true {
            return (
                <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                    <ul className="nav nav-pills">

                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={this.props.handleLogout}>Log Out</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/execLandingPage">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees">Employee Manager</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/taskManager">Task Manager</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/clientList">Client List</Link>
                        </li>
                    </ul>
                </nav>
            )
            } else {
                return (
                    <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                        <ul className="nav nav-pills">

                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={this.props.handleLogout}>Log Out</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/empLandingPage">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/employees">Employee Manager</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/taskManager">Task Manager</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/clientList">Client List</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }

        // } else if (this.props.capState === true && sessionStorage.getItem("isAdmin") === false) {
        //     return (
        //         <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
        //             <ul className="nav nav-pills"></ul>
        //             <li className="nav-item">
        //                 <Link className="nav-link" to="/" onClick={this.props.handleLogout}>Log Out</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className="nav-link" to="/empLandingPage">Dashboard</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className="nav-link" to="/clientList">Client List</Link>
        //             </li>
        //         </nav>
        //     )
        }
    }
}

export default withRouter(NavBar)

// import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"
// import './navBar.css'
// import Capstone from '../capstone'



// export default class NavBar extends Component {
//     state = {
//         user: ""
//     }

//     isAuthenticated = () => sessionStorage.getItem("userId") !== null && sessionStorage.getItem("companyId") !== null

//     // handleLogout = () => {
//     //     sessionStorage.clear()
//     //     const newState = {}
//     //     newState.user = false
//     //     this.setState(newState)
//     // }

//     render() {

//         return (
//             <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow opaqueNav">
//             {this.props.capState.user === false ?
//                 <ul className="nav nav-pills">
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/RegNewCompany">Register Company</Link>
//                     </li>
//                 </ul>
//                 :
//                 <ul className="nav nav-pills">
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/" onClick={this.props.handleLogout}>Log Out</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/employees">Employee Manager</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/taskManager">Task Manager</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/clientList">Client List</Link>
//                     </li>
//                 </ul>
//             }
//             </nav>
//         )
//     }
// }
