import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class Popup extends Component {
    render() {
        return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <h1>{this.props.text}</h1>
                        <button onClick={this.props.closePopup}>close me</button>
                    </div>
                </div>
        );
    }
}