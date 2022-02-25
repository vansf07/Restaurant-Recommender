import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Header.css';

class Header extends Component {
    state = {  }

    showMenu = (event) => {
        document.getElementById("collapsible-menu").style.display = "block";
        document.getElementById("show-menu").style.display = "none";
    };

    render() { 
        return (
            <>
            <div id="show-menu" onClick={this.showMenu}>
                <div className="hmbg"></div>
                <div className="hmbg"></div>
                <div className="hmbg"></div>
            </div>
            <div id="collapsible-menu" className="header">
                <nav className="navbar container">
                    <div className="row justify-content-end">
                        <div className="col"><Link className="link" to="/">Home</Link></div>
                        <div className="col"><Link className="link" to="/login">Login</Link></div>
                        <div className="col"><Link className="link" to="/profile">Profile</Link></div>
                    </div>
                </nav>
            </div>
            </>
        );
    }
}
 
export default Header;