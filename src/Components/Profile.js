import React, { Component } from 'react';
import styles from '../CSS/Profile.module.css';
import profilepic from '../assets/jayant-dassz-u08NEYUYvig-unsplash.jpg';
import Footer from './Footer';
import Header from './Header';
//import bgpic from '../assets/edgar-castrejon-1CsaVdwfIew-unsplash.jpg';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
//<h1>Profile</h1>
class Profile extends Component {
    state = {}
    render() {
        return (
            <div className={styles.main}>
                <Header />
                <img className={styles.profilepic} src={profilepic} alt="profile"></img>
                <div className={styles.container}><h1 className={styles.heading1}>Rani Kumar</h1></div>
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Food</h2>    
                    <span>Food Preference:</span> Indian, Chinese <br />
                    <span> Dietary Preferences:</span> Vegetarian, No Egg <br />
                    </CardContent>
                </Card>              
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Address</h2>    
                    <span>Address Line 1: </span> Shivaji Chaurastha <br />
                    <span>Address Line 2: </span>Sundar Nagar, Bandra West <br />
                    <span>City: </span>Mumbai<br /> 
                    <span>State: </span>Maharshtra <br /> 
                    <span>Country: </span>India <br />
                    <span>Pincode: </span>400050 
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Contact Details</h2>    
                    <span>Mobile Number:</span> +91987456231 <br />
                    <span className={styles.email}> Email address:</span> rani.kumar@gmail.com <br />
                    </CardContent>
                </Card>
                <Footer />
            </div>
        );
    }
}

export default Profile;