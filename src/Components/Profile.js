import React, { Component } from 'react';
import styles from '../CSS/Profile.module.css';
import profilepic from '../assets/jayant-dassz-u08NEYUYvig-unsplash.jpg';
import Footer from './Footer';
import Header from './Header';
class Profile extends Component {
    state = {  } 
    render() { 
        return (
            <div className={styles.body}>
                <Header />
                <h1>Profile</h1>
                <img src={profilepic}></img>
                <h2>Rani Kumar</h2>
                <Footer />
            </div>
        );
    }
}
 
export default Profile;