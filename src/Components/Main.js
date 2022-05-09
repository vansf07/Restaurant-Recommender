import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import Preferences from './Preferences';
import Profile from './Profile';
import Recommender from './Recommender';
import Restaurant from './Restaurant';
import SignUp from './Signup';

class Main extends Component {
    state = { 
        isLoggedIn: false,
        username: null,
        profileInfo: null,
        fetchingInfo: false,
        settingPrefs: true,
    }

    handleSignup = async(name, tel, username, password) => {
        let resp = await fetch(`http://localhost:5000/api/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password, name, tel})
        });

        resp = await resp.json();

        if(resp.success) {
            this.setState({ isLoggedIn: true, username, profileInfo: null, fetchingInfo: false, settingPrefs: true });
        }
    }

    handleLogin = async (username, password) => {
        try {
            let resp = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ isLoggedIn: true, username: resp.username, fetchingInfo: true });
                this.handleFetchProfile();
            } else {
                this.setState({ isLoggedIn: false, username: null, profileInfo: null });
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleLogout = async () => {
        try {
            let resp = await fetch(`http://localhost:5000/api/logout`, {
                method: 'POST',
                credentials: 'include'
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
                method: 'GET',
                credentials: 'include'
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ profileInfo: resp.profile, fetchingInfo: false });
            }

        } catch (err) {
            console.error(err);
        }
    }

    handleChangePrefs = async (cuisine, address) => {
        try {
            let resp = await fetch(`http://localhost:5000/api/prefs`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cuisine, address})
            })

            resp = await resp.json();
            console.log(resp);

            if(resp.success) {
                this.setState({ settingPrefs: false });
                this.handleFetchProfile();
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
                    <Route path="/signup" element={<SignUp {...this.state} handleSignup={this.handleSignup} />} />
                    <Route path="/restaurant/:id" element={<Restaurant {...this.state} />}/>
                    <Route path="/recommender" element={<Recommender {...this.state} />} />
                    <Route path="/prefs" element={<Preferences {...this.state} handleChangePrefs={this.handleChangePrefs} />} />
            </Routes>
                <Footer {...this.state} />
            </BrowserRouter>
        );
    }
}
 
export default Main;