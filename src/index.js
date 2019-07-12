import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Capstone from './components/capstone'
import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
import App from './App';


ReactDOM.render(
    <Router>
        <Capstone />
    </Router>
    , document.getElementById('root'))
