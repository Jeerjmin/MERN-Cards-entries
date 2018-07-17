import React, { Component } from 'react';
import './Header.scss';
import Inputs from '../components/Input.js'
export default class Header extends Component {




    render() {

        return (
            <div className="headerWrapper">
                <div className="companyTitle"></div>
                <Inputs />
            </div>
        );
    }
}
