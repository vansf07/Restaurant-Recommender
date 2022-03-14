import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../CSS/App.module.css';

import Footer from './Footer';
import Header from './Header';

const observerLeft = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // sentry.target.classList.add(styles.featureAnimationLeft);
            entry.target.classList.add(styles.featureAnimationFadeIn);
        }
    });
});

const observerRight = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // entry.target.classList.add(styles.featureAnimationRight);
            entry.target.classList.add(styles.featureAnimationFadeIn);
        }
    });
});

function getLanding(props) {
    return (
        <section id="landing">
            <div className={styles.landingImage}>
                <div className={styles.landingImageMask}></div>
                <div className={styles.landingTextWrapper}>
                    <p className={styles.landingText}>Let <em>us</em> decide your dinner tonight.</p>
                    <a href="#get-started">
                        <div className={styles.arrow}>
                            <span className={styles.arrowSpan}></span>
                            <span className={styles.arrowSpan}></span>
                            <span className={styles.arrowSpan}></span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}

function getFeatureTable(props) {
    return (
        <section id="features">
            <p className={styles.featuresHeading}>What do we offer?</p>
            <div className={`container ${styles.featuresTable}`}>
                <div className={`row row-cols-1 row-cols-md-2 justify-content-evenly ${styles.row}`}>
                    <div className={`col featureLeft ${styles.col} ${styles.feature}`}>Recommendations</div>
                    <div className={`col featureRight ${styles.col} ${styles.featureDetail}`}>Let us suggest what you should try next</div>
                </div>
                <div className={`row row-cols-1 row-cols-md-2 justify-content-evenly ${styles.row}`}>
                    <div className={`col featureRight ${styles.smallVisible} ${styles.col} ${styles.feature}`}>Reviews and Ratings</div>
                    <div className={`col featureLeft ${styles.col} ${styles.featureDetail}`}>
                        Know your restaurant before you go.
                        Had a good experience? Let others know
                    </div>
                    <div className={`col featureRight ${styles.bigVisible} ${styles.col} ${styles.feature}`}>Reviews and Ratings</div>
                </div>
                <div className={`row row-cols-1 row-cols-md-2 justify-content-evenly ${styles.row}`}>
                    <div className={`col featureLeft ${styles.col} ${styles.feature}`}>Contact</div>
                    <div className={`col featureRight ${styles.col} ${styles.featureDetail}`}>Have any queries? Ring the restaurant. We make it easy to make a reservation.</div>
                </div>
                <div className={`row row-cols-1 row-cols-md-2 justify-content-evenly ${styles.row}`}>
                    <div className={`col featureRight ${styles.smallVisible} ${styles.col} ${styles.feature}`}>Locate</div>
                    <div className={`col featureLeft ${styles.col} ${styles.featureDetail}`}>Curated locations to ensure that the map points you right to the door of the restaurant.</div>
                    <div className={`col featureRight ${styles.bigVisible} ${styles.col} ${styles.feature}`}>Locate</div>
                </div>
            </div>
        </section>
    );
}

function getStartedButton() {
    return (
        <section id="get-started" className={styles.getStartedSection}>
            <div className={styles.getStartedP}>
                <p>Ready to try?</p>
            </div>
            <div className={styles.getStartedButton}>
                <Link to="/signin">
                    <button type='button'>Get Started</button>
                </Link>
            </div>
            <div className={styles.getStartedP} style={{fontSize: 'min(1.4rem, 4.3vw)', marginTop: '35px'}}>
                <p>Learn more below</p>
            </div>
        </section>
    );
}

class App extends Component {
    render() { 
        return (
            <div className={styles.body}>
                <Header />
                { getLanding(this.props) }
                { getStartedButton() }
                { getFeatureTable(this.props) }
                <Footer />
            </div>
        );
    }

    componentDidMount() {
        for(const x of document.getElementsByClassName("featureLeft"))
            observerLeft.observe(x)
        
        for(const x of document.getElementsByClassName("featureRight"))
            observerRight.observe(x)
    }
}
 
export default App;
