import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './navBar.css'
// import ApplicationViews from './applicationViews'


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees">Employee Manager</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Task Manager</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar