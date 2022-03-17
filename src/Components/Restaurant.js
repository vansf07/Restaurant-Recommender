import React from 'react';
import { useParams } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

import styles from '../CSS/Restaurant.module.css';

import i1 from '../assets/res1_1.jfif';
import i2 from '../assets/res1_2.jfif';
import i3 from '../assets/res1_3.jfif';

export function ratingStars(rating) {
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

function reviewBlock(reviews, element_key) {
    return (
        <div key={element_key} className={`col ${styles.reviewBlock}`}>
            <p>{reviews[0]} <span>{ ratingStarsSmall(reviews[1]) }</span></p>
            <p>{reviews[2]}</p>
        </div>
    );
}

function reviewBlocks(xs) {
    let arr = [];
    for(let x of xs) {
        arr.push(reviewBlock(x, `reviewblock_${x[0]}`));
    }
    return arr;
}

function images(links) {
    return (
        <div className={`${styles.imageSlide}`}>
            <img src={i1} alt="pic1" />
            <img src={i2} alt="pic2" />
            <img src={i3} alt="pic3" />
        </div>
    );
}


function restaurantInfo(props) {
    // console.log(props);
    return (
        <div className={`container ${styles.container}`}>
            <div className={`row row-cols-1 ${styles.main}`}>
                <h3 className={`col ${styles.col}`}>Shanti Sagar</h3>
                <p className={`col ${styles.col}`}>South Indian, Chinese</p>
                <p className={`col ${styles.col}`}>Pure veg</p>
                <span>{ ratingStars(4) }</span>
            </div>

            <div className={`row ${styles.images}`}>
                { images(["/api/images/res1_1.png", "/api/images/res1_2.png"]) }
            </div>
            
            <div className={`row ${styles.reviewContainer}`}>
                <p>Reviews</p>
                <div className={`container`}>
                    <div className='row row-cols-1 row-cols-sm-2 g-2'>
                        {
                            reviewBlocks([
                                ["User 1", 3, "Ok"],
                                ["User 2", 5, "Very nice food"],
                                ["User 3", 4, "Good service"]
                            ])
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default function Restaurant(props) {

    let { id } = useParams();
    console.log(id);

    return (
        <>
        <Header />
        <section className={`${styles.section}`}>
            { restaurantInfo(props) }
        </section>
        <Footer />
        </>
    );
};