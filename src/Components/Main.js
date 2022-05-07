import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import Profile from './Profile';
import Recommender from './Recommender';
import Restaurant from './Restaurant';
import SignUp from './Signup';

class Main extends Component {
    state = { 
        isLoggedIn: false,
        username: null,
        profileInfo: null,
    }

    handleLogin = async (username, password) => {
        try {
            let resp = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ isLoggedIn: true, username: resp.username })
                this.handleFetchProfile();
            } else {
                this.setState({ isLoggedIn: false, username: null, profileInfo: null })
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleLogout = async () => {
        try {
            let resp = await fetch(`http://localhost:5000/api/logout`, {
                method: 'POST'
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ isLoggedIn: false, username: null, profileInfo: null });
            }

        } catch (err) {
            console.error(err);
        }
    }

    handleFetchProfile = async () => {
        try {
            let resp = await fetch(`http://localhost:5000/api/profile`, {
                method: 'GET'
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ profileInfo: resp.profile });
            }

        } catch (err) {
            console.error(err);
        }
    }

    render() { 
        return (
            <BrowserRouter>
                <Header {...this.state} handleLogout={this.handleLogout} />
            <Routes>
                    <Route path="/" element={<App {...this.state} />} />
                    <Route path="/profile" element={<Profile {...this.state} />} />
                    <Route path="/signin" element={<Login {...this.state} handleLogin={this.handleLogin} />} />
                    <Route path="/signup" element={<SignUp {...this.state} />} />
                    <Route path="/restaurant/:id" element={<Restaurant {...this.state} />}/>
                    <Route path="/recommender" element={<Recommender {...this.state} />} />
            </Routes>
                <Footer {...this.state} />
            </BrowserRouter>
        );
    }
}
 
export default Main;