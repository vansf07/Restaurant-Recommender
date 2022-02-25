import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/Header.css';

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className="header">
                <nav className="navbar container">
                    <div className="row row-cols-1 row-cols-sm-3 justify-content-end">
                        <div className="col"><Link className="link" to="/">Home</Link></div>
                        <div className="col"><Link className="link" to="/login">Login</Link></div>
                        <div className="col"><Link className="link" to="/profile">Profile</Link></div>
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default Header;