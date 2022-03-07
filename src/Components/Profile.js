import React, { Component } from 'react';
import styles from '../CSS/Profile.module.css';

import Footer from './Footer';
import Header from './Header';
class Profile extends Component {
    state = {  } 
    render() { 
        return (
            <div className={styles.body}>
                <Header />
                <h1>Profile</h1>
                <Footer />
            </div>
        );
    }
}
 
export default Profile;