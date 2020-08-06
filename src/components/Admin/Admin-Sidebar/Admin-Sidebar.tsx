import React, { FunctionComponent } from 'react';

import "./Admin-Sidebar.scss";

interface ASProps {

}

const AdminSidebar: FunctionComponent<ASProps> = () => {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Raised with Wonder</h3>
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <a id="homeDropdown" href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="clearfix collapsed">
                        <span>Site Navigation</span><i className="fas fa-caret-down"/>
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="/"><i className="fas fa-home"/> Home</a>
                        </li>
                        <li>
                            <a href="/blog/"><i className="fas fa-file-alt"/> Blog</a>
                        </li>
                        <li>
                            <a href="/ophiebee/"><i className="fas fa-store"/> OphieBee</a>
                        </li>
                        <li>
                            <a href="/homeschool/"><i className="fas fa-chalkboard-teacher"/> Homeschool</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#statistics">Website Statistics</a>
                    <a id="blogDropdown" href="#blogSubmenu" data-toggle="collapse" aria-expanded="false" className="clearfix">
                        <span>Manage Blog Posts</span><i className="fas fa-caret-down"/>
                    </a>
                    <ul className="collapse list-unstyled show" id="blogSubmenu">
                        <li>
                            <a href="#viewBlogs"><i className="fas fa-edit"/> View/Edit Blog Posts</a>
                        </li>
                        <li>
                            <a href="#publishBlogs"><i className="fas fa-paper-plane"/> Change Publication Status</a>
                        </li>
                        <li>
                            <a href="#createBlog"><i className="fas fa-plus"/> Create Blog Post</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default AdminSidebar;