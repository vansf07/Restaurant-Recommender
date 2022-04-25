import React, { Component } from 'react';

import styles from  '../CSS/Footer.module.css';

class Footer extends Component {
    state = {  }

    showMenu = (event) => {
        document.getElementById("collapsible-menu").style.display = "block";
        document.getElementById("show-menu").style.display = "none";
    };

    render() { 
        return (
            <footer className={`${styles.footer}`}>
                <a href="#top" className={`${styles.link}`}><p className={`${styles.backToTop} ${styles.linkText}`}>Back to top</p></a>
                <br />
                {/* <div className={`container ${styles.container}`}>
                    <div className={`row col-1 col-sm-3 justify-content-evenly ${styles.row}`}>
                        <div className={`col ${styles.col}`}>Link 1</div>
                        <div className={`col ${styles.col}`}>Link 2</div>
                        <div className={`col ${styles.col}`}>Link 3</div>
                    </div>
                </div> */}
            </footer>
        );
    }
}
 
export default Footer;