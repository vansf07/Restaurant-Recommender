import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import '../CSS/login.signup.css'

export default class SignUp extends Component {

    state = {};

    handleChange = (target, value) => {
        let s = {};
        s[target] = value;
        this.setState(s);
    }

    handleSubmit = (event) => {
        this.props.handleSignup(this.state.name, this.state.tel, this.state.username, this.state.password);

        event.preventDefault();
    }

    render() {
        if(this.props.isLoggedIn) {
            return <Navigate to="/prefs" />
        }

        return (
            <div className="outer">
                <div className="inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input required type="text" className="form-control" placeholder="Name" onChange={(e) => this.handleChange('name', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input required type="tel" className="form-control" placeholder="Mobile" onChange={(e) => this.handleChange('tel', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input required type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.handleChange('username', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input required type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.handleChange('password', e.target.value)} />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                        <p className="forgot-password text-right">
                            Already registered? <a href="signin">Log in</a>
                        </p>
                    </form>
                </div>
            </div>

        );
    }
}