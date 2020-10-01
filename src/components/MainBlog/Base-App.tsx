import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import "../../css/base-app.scss";
import "../../css/Home.scss";

import banner_image from '../../images/rww-banner.png';

import Navbar from './Navbar';
import AdminEditBlogContent from '../Admin/Admin-Blogs/AdminEditBlogContent';
import AdminHome from '../Admin/Admin-Home';
import DisplayBlog from './DisplayBlog';
import { blogPost } from '../../../rww-backend/dbTypes';
import Axios from 'axios';
import Config from '../../externals/config';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
 
interface BaseAppProps {

}


const BaseApp: React.FunctionComponent<BaseAppProps> = () => {

    const [blogPosts, setBlogPosts] = useState<blogPost[]>([]);

    useEffect(() => {
        Axios({
            method: "GET",
            url: `${Config.getBackendURL()}/blog/top/3`,
        }).then(res => {
            setBlogPosts(res.data);
        });
    }, []);



    return (

        <Router>

            <Switch>
                
                {/** ADMIN DASHBOARD */}
                <Route path="/admin">
                    <AdminHome/>
                </Route>

                { /* View blog detail list */}
                <Route path="/list-blogs" component={AdminEditBlogContent} />

                { /* Home page, sub switch renders what blogs show in the left-most column */ }
                <Route path="/">

                    <Navbar />

                    <div className="container-fluid" id="base-app-container">

                        <div>
                            <Switch>
                                <Route exact path="/">
                                    <ResponsiveImage elementID="page-header-image" additionalClasses="mb-4" src={banner_image}/>
                                </Route>

                                <Route path="/blogs">
                                    <ResponsiveImage elementID="page-header-image" additionalClasses="mb-4" src={banner_image}/>
                                </Route>

                                <Route path="/ophiebee">
                                    { /* Business banner image */ }
                                </Route>
                                
                                <Route path="/homeschool">
                                    { /* Homeschool banner image */ }
                                </Route>

                            </Switch>

                            <div className="row">
                                <div className="offset-lg-1 col-lg-6 border-pink" id="blog-column">

                                    <Switch>
                                        <Route exact path="/">
                                            { blogPosts.map( (blogPost) => <DisplayBlog key={blogPost.title} displayExcerpt={false} blogTitle={blogPost.title}/>)}
                                        </Route>

                                        { /* View a specific blog */}
                                        <Route path="/blog/:title" render={
                                            props => <DisplayBlog displayExcerpt={false} blogTitle={props.match.params.title}/>
                                        }/>
                                            

                                        <Route path="/blogs">
                                            { /* All personal blogs */ }
                                        </Route>

                                        <Route path="/ophiebee">
                                            { /* All business blogs */ }
                                        </Route>
                                        
                                        <Route path="/homeschool">
                                            { /* All homeschool blogs */ }
                                        </Route>

                                    </Switch>


                                </div>
                                <div className="offset-lg-1 col-lg-3">
                                    <div className="border-pink my-4" id="about_me_box">
                                        About Me Section
                                    </div>
                                    <div className="border-pink" id="archive_section">
                                        Archive Section
                                    </div>
                                </div>
                            </div>

                            <div className="row my-5">
                                <h1 className="mx-auto"> Most Popular Posts by View Count</h1>
                            </div>
                            <div className="row my-5">
                                <h1 className="col border-pink">Blog Post 1 Featured image, and title</h1>
                                <h1 className="col border-pink">Blog Post 2 Featured image, and title</h1>
                                <h1 className="col border-pink">Blog Post 3 Featured image, and title</h1>
                            </div>
                        </div>
                        <footer style={{backgroundColor: "pink", height: '300px'}}>
                            Footer stuff goes here    
                        </footer>                    
                    </div>
                
                </Route>

            </Switch>

        </Router>
    );
}

export default BaseApp;