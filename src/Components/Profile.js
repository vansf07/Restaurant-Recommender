import React, { Component } from 'react';
import styles from '../CSS/Profile.module.css';
//import bgpic from '../assets/edgar-castrejon-1CsaVdwfIew-unsplash.jpg';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Navigate } from 'react-router-dom';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
//<h1>Profile</h1>
class Profile extends Component {
    state = {}
    render() {
        if(!this.props.isLoggedIn) {
            return <Navigate to="/signin" />
        }

        if(this.props.fetchingInfo) {
            return (
                <div className={styles.main}>
                    Fetching Profile...
                </div>
            );
        }

        if(!this.props.profileInfo) {
            return (
                <div className={styles.main}>
                    Profile couldn't be fetched.
                </div>
            );
        }

        const p = this.props.profileInfo;

        return (
            <div className={styles.main}>
                <div className={styles.container}><h1 className={styles.heading1}>{p.name}</h1></div>
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Food</h2>    
                    <span>Food Preference:</span> {p.cuisine} <br />
                    {/*<span> Dietary Preferences:</span> {p.diet} <br />*/}
                    </CardContent>
                </Card>              
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Address</h2>
                    {p.address}
                    {/* <span>Address Line 1: </span> Shivaji Chaurastha <br />
                    <span>Address Line 2: </span>Sundar Nagar, Bandra West <br />
                    <span>City: </span>Mumbai<br /> 
                    <span>State: </span>Maharshtra <br /> 
                    <span>Country: </span>India <br />
                    <span>Pincode: </span>400050  */}
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardContent style={{backgroundColor: "#e4dfda"}}>
                    <h2 className={styles.heading2}>Contact Details</h2>    
                    <span>Mobile Number:</span> {p.tel} <br />
                    <span className={styles.email}> Email address:</span> {p.username} <br />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Profile;