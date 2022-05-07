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
     }

    render() { 
        return (
            <BrowserRouter>
                <Header {...this.state} />
            <Routes>
                    <Route path="/" element={<App {...this.state} />} />
                    <Route path="/profile" element={<Profile {...this.state} />} />
                    <Route path="/signin" element={<Login {...this.state} />} />
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