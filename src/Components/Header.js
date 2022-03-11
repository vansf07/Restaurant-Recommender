import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../CSS/Header.module.css';

class Header extends Component {
    state = {  }

    showMenu = (event) => {
        document.getElementById("collapsible-menu").style.display = "block";
        document.getElementById("show-menu").style.display = "none";
    };

    render() { 
        return (
            <>
            <div id="show-menu" className={styles.showMenu} onClick={this.showMenu}>
                <div className={styles.hmbg}></div>
                <div className={styles.hmbg}></div>
                <div className={styles.hmbg}></div>
            </div>
            <div id="collapsible-menu" className={`header ${styles.header} ${styles.collapsibleMenu}`}>
                <nav className={`navbar container ${styles.navbar}`}>
                    <div className="row justify-content-end">
                        <div className={`col ${styles.col}`}><Link className={`link ${styles.link}`} to="/">Home</Link></div>
                        <div className={`col ${styles.col}`}><Link className={`link ${styles.link}`} to="/signin">LogIn</Link></div>
                        <div className={`col ${styles.col}`}><Link className={`link ${styles.link}`} to="/signup">SignUp</Link></div>
                        <div className={`col ${styles.col}`}><Link className={`link ${styles.link}`} to="/profile">Profile</Link></div>
                    </div>
                </nav>
            </div>
            </>
        );
    }
}
 
export default Header;