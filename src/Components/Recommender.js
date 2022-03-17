import React, { Component } from 'react';
import styles from '../CSS/Recommender.module.css';
import Footer from './Footer';
import Header from './Header';
import i1 from '../assets/res1_1.jfif';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import {ratingStars} from './Restaurant';
/*
<CardMedia
                        component="img"
                        height="140"
                        alt="picture of restaurant"
                        image={i1}
                    />
*/
class Recommender extends Component {
    state = {}
    render() {
        return (
            <div className={styles.body}>
            <Header />
            <div className={styles.main}>
                
                <h1 className={styles.heading}>Hello Rani Kumar, are you ready to explore?</h1>
                <Card className={styles.cardR}>
                    <CardContent style={{ backgroundColor: "#e4dfda" }}>
                        <img src={i1} className={styles.restaurantpic}></img>
                        <span className={styles.headingR}>Shanti Sagar</span>  <br />
                        <span>Tags: </span> South Indian, Chinese, Pure Vegetarian <br /> <br />
                        <span>Ratings: </span><span>{ ratingStars(4) }</span> <br />
                    </CardContent>
                    <CardActions style={{ backgroundColor: "#e4dfda" }}>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>                
            </div>
            <Footer />
            </div>
        );
    }
}

export default Recommender;
