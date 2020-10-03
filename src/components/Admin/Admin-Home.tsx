import React, {  } from 'react';
import AdminSidebar from './Admin-Sidebar';
import "../../css/Admin-Home.scss";
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AdminEditBlogContent from './Admin-Blogs/AdminEditBlogContent';
import AdminViewBlogs from './Admin-Blogs/AdminViewBlogs';
import AdminEditBlogDetail from './Admin-Blogs/AdminEditBlogDetail';
import AdminDeleteBlog from './Admin-Blogs/AdminDeleteBlog';

interface AHProps {

}


const AdminHome: React.FunctionComponent<AHProps> = () => {

    const {path} = useRouteMatch();

    return (
        <div className="wrapper">

            <AdminSidebar/>
            
            <div id="content">
                    <Switch> 

                        { /** View table of all blogs */}
                        <Route path={`${path}/blogs/view`}>
                            <AdminViewBlogs />
                        </Route>

                        { /** Delete an existing blog document */}
                        <Route path={`${path}/blogs/delete/:title`}>
                            <AdminDeleteBlog />
                        </Route>

                        { /** Edit an existing blog document */}
                        <Route path={`${path}/blogs/create/:title`}>
                            <AdminEditBlogDetail editMode={true}/>
                        </Route>

                        { /** Create a new blog document */}
                        <Route path={`${path}/blogs/create/`}>
                            <AdminEditBlogDetail editMode={false}/>
                        </Route>
                        
                        { /** Edit an existing blog document */}
                        <Route path={`${path}/blogs/publish`}>
                            <div>
                                Test
                            </div>
                        </Route>

                        { /** Edit a blog post */}
                        <Route path={`${path}/blogs/edit/:title`}> 
                            <AdminEditBlogContent editMode={true} />
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