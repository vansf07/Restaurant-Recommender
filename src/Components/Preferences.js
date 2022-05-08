import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import '../CSS/login.signup.css'

class Preferences extends Component {
    state = {
        diet: "veg",
        cuisine: "sind"
    };

    handleChange = (target, value) => {
        let s = {};
        s[target] = value;
        this.setState(s);
    }

    handleSubmit = (event) => {
        this.props.handleChangePrefs(this.state.diet, this.state.cuisine, this.state.address);
        // console.log(this.state);
        event.preventDefault();
    }

    render() {

        if(!this.props.settingPrefs) {
            return <Navigate to="/profile" />;
        }

        return (
            <div className="outer">
                <div className="inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Choose your preferences</h3>

                        <div className="form-group">
                            <label>Cuisine Preference</label>
                            <select className="form-select" value={this.state.cuisine} onChange={(e) => this.handleChange('cuisine', e.target.value)}>
                                <option value="sind">South Indian</option>
                                <option value="nind">North Indian</option>
                                <option value="chn">Chinese</option>
                                <option value="arb">Arabic</option>
                                <option value="eng">English</option>
                                <option value="fch">French</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Dietary Preference</label>
                            <select className="form-select" value={this.state.diet} onChange={(e) => this.handleChange('diet', e.target.value)}>
                                <option value="veg">Vegetarian</option>
                                <option value="nonveg">Non-Vegetarian</option>
                                <option selected value="vegan">Vegan</option>
                                <option value="noegg">No Egg</option>
                                <option value="allergy">Allergies</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input required type="text" className="form-control" placeholder="Enter address" onChange={(e) => this.handleChange('address', e.target.value)} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Set Preference</button>
                    </form>
                </div>
            </div>

        );
    }
}
 
export default Preferences;