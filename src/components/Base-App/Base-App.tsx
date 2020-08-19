import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './base-app.scss';

import Navbar from './NavBar/Navbar';
import Home from '../Home/Home';
import Authorization from '../Authorization/Authorization';
import AdminEditBlogContent from '../Admin/Admin-Blogs/EditBlog/AdminEditBlog';
import AdminHome from '../Admin/Admin-Home/Admin-Home';
import BlogPreview from '../Home/BlogPreview/BlogPreview';
import DisplayBlog from '../DisplayBlog/DisplayBlog';
 
interface BaseAppProps {

}

interface BaseAppState { 

}

export default class BaseApp extends React.Component<BaseAppProps, BaseAppState> {

    render() { 
        return (

            <Router>

                <Switch>
                    
                    {
                    /**
                     * ADMIN DASHBOARD
                     */
                    }
                    <Route path="/admin">
                        <AdminHome/>
                    </Route>

                    {
                    /**
                     * SITE BASE
                     */
                    }
                    <Route path="/">
                        <Navbar />

                        <div className="container-fluid" style={{height: '3000px' }} id="base-app-container">

                            <Switch>

                                <Route exact path="/" component={Home} />

                                { /* View a specific blog */}
                                <Route path="/blog/:title" component={DisplayBlog} />

                                { /* View blog detail list */}
                                <Route path="/blog" component={AdminEditBlogContent} />

                                <Route path="/auth" component={Authorization} />

                                {/* 404 Page */}
                                <Route> 
                                    <div>
                                        <h1> 404 Error </h1>
                                    </div>
                                </Route>

                            </Switch>
                        
                        </div>
                    
                    </Route>

                </Switch>

            </Router>
        );
    }
}