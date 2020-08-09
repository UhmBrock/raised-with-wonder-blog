import React, { useState } from 'react';
import AdminSidebar from '../Admin-Sidebar/Admin-Sidebar';
import "./Admin-Home.scss";
import { stat } from 'fs';
import { useLocation, Switch, Route, useRouteMatch } from 'react-router-dom';
import AdminCreateBlog from '../Admin-Blogs/Admin-CreateBlog/AdminCreateBlog';

interface AHProps {

}

interface AHState {
}

const AdminHome: React.FunctionComponent<AHProps> = () => {

    const {path, params} = useRouteMatch();

    return (
        <div className="wrapper">

            <AdminSidebar/>
            
            <div id="content">
                    <Switch> 

                        <Route path={`${path}/blogs/view`}>
                            <h3>On the view tab</h3>
                            <a href={`${path}/blogs/edit/Test-Blog-Post-2`}> Edit a blog </a>
                        </Route>

                        <Route path={`${path}/blogs/edit/:title`}> 
                            <AdminCreateBlog editMode={true} />
                        </Route>

                        <Route path={`${path}/blogs/publish`}>
                            <h3> On the publish page</h3>
                        </Route>

                        <Route path={`${path}/blogs/create`}>
                            <AdminCreateBlog editMode={false}/>
                        </Route>
                            
                        <Route path={`${path}/images/view`}>
                            <h3>On the view images tab</h3>
                            <p> This page will contain a gallery with controls to delete /copy urls for images </p> 
                        </Route>
                        
                        <Route path={`${path}/images/featured`}>
                            <h3>On the featured images tab</h3>
                            <p> This page will contain special controls for changing things such as banner images </p>
                        </Route>

                        <Route path={`${path}/images/upload`}>
                            <h3>On the image upload tab</h3>
                            <p> This will be a tool for uploading and possibly editing images if available </p>
                        </Route>
                    </Switch>
            </div>
        </div>
    )
}

export default AdminHome;