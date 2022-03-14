import React, { Component } from 'react';
import styles from '../CSS/Profile.module.css';
import profilepic from '../assets/jayant-dassz-u08NEYUYvig-unsplash.jpg';
import Footer from './Footer';
import Header from './Header';
import bgpic from '../assets/edgar-castrejon-1CsaVdwfIew-unsplash.jpg';
//<h1>Profile</h1>
class Profile extends Component {
    state = {  } 
    render() { 
        return (
            <div className={styles.main}>
                <Header />
                <section>
                <div className={styles.profilebg}></div>
                </section>
                <img src={profilepic} alt="profile"></img>
                <div className={styles.container}><h2>Rani Kumar</h2></div>
                <p className={styles.content}>
                    <span>Age:</span> 20 <br/>
                    <span>Address: </span><br />
                    H NO. 9-10-8 <br /> Shivaji Chaurastha <br /> Sundar Nagar, Bandra West <br /> Mumbai - 400050 <br /> Maharshtra <br /> India <br />
                    <span>Mobile Number:</span> +91987456231 <br/>
                    <span>Food Preference:</span> Indian, Chinese <br/>
                    <span> Dietary Preferences:</span> Vegetarian, No Egg <br />
                    <span> Email address:</span> rani.kumar@gmail.com
                </p>
                <Footer />
            </div>
        );
    }
}
 
export default Profile;