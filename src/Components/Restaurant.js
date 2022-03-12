import React, { Component } from 'react';

import Footer from './Footer';
import Header from './Header';

import styles from '../CSS/Restaurant.module.css';

function ratingStars(rating) {
    let stars = [];

    for(let i = 0; i < 5; i++, rating--) {
        if (rating > 0)
            stars.push(<i key={`rat_main_${i}`} className={`fa fa-star fa-2x ${styles.fa}`} aria-hidden="true"></i>);
        else
            stars.push(<i key={`rat_main_${i}`} className={`fa fa-star-o fa-2x ${styles.fa}`} aria-hidden="true"></i>);
    }

    return stars;
}

function ratingStarsSmall(rating) {
    let stars = [];

    for(let i = 0; i < 5; i++, rating--) {
        if (rating > 0)
            stars.push(<i key={`rat_user_${i}`} className={`fa fa-star ${styles.fa}`} aria-hidden="true"></i>);
        else
            stars.push(<i key={`rat_user_${i}`} className={`fa fa-star-o ${styles.fa}`} aria-hidden="true"></i>);
    }

    return stars;
}

function reviewBlock(reviews) {
    return (
        <div>
            <p>{reviews[0]} <span>{ ratingStarsSmall(reviews[1]) }</span></p>
            <p>{reviews[2]}</p>
        </div>
    );
}

function reviewBlocks(xs) {
    let arr = [];
    for(let x of xs) {
        arr.push(reviewBlock(x));
    }
    return arr;
}

function images(links) {
    return (
        <div>
            Images
        </div>
    );
}

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props);
    }

    restaurantInfo = (props) => {
        return (
            <div>
                <div>
                    <h3>Shanti Sagar</h3>
                    <p>South Indian, Chinese</p>
                    <p>Pure veg</p>
                </div>
                <div>
                    <div>
                        Rating
                        <span>{ ratingStars(4) }</span>
                    </div>
                    <div>
                        <p>Reviews</p>
                        <div>
                            {
                                reviewBlocks([
                                    ["User 1", 3, "Ok"],
                                    ["User 2", 5, "Very nice food"]
                                ])
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        { images(["/api/images/res1_1.png", "/api/images/res1_2.png"]) }
                    </div>
                </div>
            </div>
        );
    }

    render() { 
        return (
            <>
            <Header />
            { this.restaurantInfo(this.state) }
            <Footer />
            </>
        );
    }
}
 
export default Restaurant;