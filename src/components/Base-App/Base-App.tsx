import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './base-app.scss';

import Navbar from '../NavBar/Navbar';
import Home from '../Home/Home';

interface BaseAppProps {

}

interface BaseAppState {

}

export default class BaseApp extends React.Component<BaseAppProps, BaseAppState> {

    render() { 
        return (

            <Router>

                <Navbar />

                <div className="container-fluid" style={{height: '3000px' }} id="base-app-container">

                    <Switch>

                        <Route exact path="/">
                            <Home />    
                        </Route>

                        <Route path="/about-me">

                        </Route>

                        <Route> {/* 404 Page */ }
                            <div>
                                <h1> 404 Error </h1>
                            </div>
                        </Route>
                    </Switch>
    
                </div>

            </Router>
        );
    }
}