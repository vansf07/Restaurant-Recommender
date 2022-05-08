import React, { Component } from 'react';
import styles from '../CSS/Recommender.module.css';
import i1 from '../assets/res1_1.jfif';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {ratingStars} from './Restaurant';
import { Link, Navigate } from 'react-router-dom';
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

    rests = [];

    async componentDidMount() {
        if(!this.props.isLoggedIn) {
            return;
        }

        try {
            let resp = await fetch(`http://localhost:5000/api/recommendations`, {
                method: 'GET',
                credentials: 'include'
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.getRestaurants(resp.recommendations);
            }

        } catch (err) {
            console.error(err);
        }
    }

    getRestaurants = async (list) => {
        for(let i = 0; i < list.length; i++) {
            try {
                let resp = await fetch(`http://localhost:5000/api/restaurant?id=${list[i]}`, {
                    method: 'GET',
                    credentials: 'include'
                })
    
                resp = await resp.json();
    
                if(resp.success) {
                    this.rests.push(resp.info);
                }
            } catch (err) {
                console.error(err);
            }
        }
        console.log(this.rests);
    }

    render() {
        if(!this.props.isLoggedIn) {
            return <Navigate to="/signin" />
        }

        return (
            <div className={styles.body}>
            <div className={styles.main}>
                <h1 className={styles.heading}>Hello Rani Kumar, are you ready to explore?</h1>
                <div><Card className={styles.cardR} style={{ backgroundColor: "#e4dfda" }}>
                    <CardContent style={{ backgroundColor: "#e4dfda" }}>
                        <img src={i1} alt="rest" className={styles.restaurantpic}></img>
                        <span className={styles.headingR}>Shanti Sagar</span>  <br />
                        <span>Tags: </span> South Indian, Chinese, Pure Vegetarian <br /> <br />
                        <span>Ratings: </span><span>{ ratingStars(4) }</span> <br />
                    </CardContent>
                    <CardActions style={{ backgroundColor: "#e4dfda" }}>
                        <Link to="/restaurant/1"><Button size="small">Learn More</Button></Link>
                    </CardActions>
                </Card> 
                </div>               
            </div>
            </div>
        );
    }
}

export default Recommender;
