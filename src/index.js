import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Capstone from './components/capstone'
// import './index.css';
import App from './App';


ReactDOM.render(
    <Router>
        <Capstone />
    </Router>
    , document.getElementById('root'))



// import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Router } from "react-router-dom"
// import Kennel from './components/Kennel'

// import './index.css'

// ReactDOM.render(
//     <Router>
//         <Kennel />
//     </Router>
//     , document.getElementById('root'))