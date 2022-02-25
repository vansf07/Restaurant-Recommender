import React, { Component } from 'react';

import '../CSS/App.css';

import Header from './Header';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <Header />
                <p>Home Page</p>
            </>
        );
    }
}
 
export default App;
