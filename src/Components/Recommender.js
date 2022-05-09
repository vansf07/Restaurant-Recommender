import React, { Component } from 'react';
import styles from '../CSS/Recommender.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
/*
<CardMedia
                        component="img"
                        height="140"
                        alt="picture of restaurant"
                        image={i1}
                    />
*/
class Recommender extends Component {
    state = { rests: [] }

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
                console.log(resp);
    
                if(resp.success) {
                    let x = this.state.rests;
                    x.push(resp.info);
                    this.setState({rests: x});
                }
            } catch (err) {
                console.error(err);
            }
        }
        console.log(this.state.rests);
    }

    setVisited = async (id) => {
        try {
            let resp = await fetch(`http://localhost:5000/api/setVisit?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({});
            }
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if(!this.props.isLoggedIn) {
            return <Navigate to="/signin" />
        }

        let cards = [];
        console.log("Here", this.state.rests);

        for(let r of this.state.rests) {
            cards.push((
                <Card className={styles.cardR} style={{ backgroundColor: "#e4dfda" }}>
                    <CardContent style={{ backgroundColor: "#e4dfda" }}>
                        <span className={styles.headingR}>{r.Name}</span>  <br />
                        <span>Cuisine: </span> {r.Cuisine} <br /> <br />
                        <span>Address: </span><span>{r.Address}</span> <br />
                    </CardContent>
                    <CardActions style={{ backgroundColor: "#e4dfda" }}>
                        <Button size="small" onClick={ () => this.setVisited(r.restaurant_id) }>Visited</Button>
                    </CardActions>
                </Card>
            ));
        }

        return (
            <div className={styles.body}>
            <div className={styles.main}>
                <h1 className={styles.heading}>Hello {this.props.profileInfo.name}, are you ready to explore?</h1>
                <div className={styles.cardsDiv}>
                    {cards}
                </div>               
            </div>
            </div>
        );
    }
}

export default Recommender;
