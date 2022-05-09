import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import '../CSS/login.signup.css'

export default class Login extends Component {

    state = {};

    handleChange = (target, val) => {
        let s = {}
        s[target] = val
        this.setState(s);
    }

    handleSubmit = (event) => {
        this.props.handleLogin(this.state.username, this.state.password);
        event.preventDefault();
    };

    render() {
        if(this.props.isLoggedIn) {
            return <Navigate to="/profile" />
        }

        return (
            <div className="outer">
                <div className="inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Log In</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.handleChange('username', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => this.handleChange('password', e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                        {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    </form>
                </div>

            </div>

        );
    }
}
