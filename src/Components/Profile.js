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
                <p className={styles.content}>
                    <span>Age:</span> 20 <br/>
                    <span>Address: </span><br />
                    H NO. 9-10-8 <br /> Shivaji Chaurastha <br /> Sundar Nagar, Bandra West <br /> Mumbai - 400050 <br /> Maharshtra <br /> India <br />
                    <span>Mobile Number:</span> +91987456231 <br/>
                    <span>Food Preference:</span> Indian, Chinese <br/>
                    <span> Dietary Preferences:</span> Vegetarian, No Egg
                </p>
                <Footer />
            </div>
        );
    }
}
 
export default Profile;