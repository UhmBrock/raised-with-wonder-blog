import React, { FunctionComponent, useState } from 'react';

import "./Admin-Sidebar.scss";
import { useLocation, useRouteMatch } from 'react-router-dom';

interface ASProps {

}

const AdminSidebar: FunctionComponent<ASProps> = (props: ASProps) => {

    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const { path, url } = useRouteMatch();
    const location = useLocation();

    console.log(path, url)

    return (
        <div className="nav">
            <nav id="sidebar" className={sidebarVisible ? "" : "active"}>
                <div className="sidebar-header">
                    <h3>Raised with Wonder</h3>
                </div>

                <ul className="list-unstyled components">
                    <li>
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
                    <li className={ location.pathname === `${path}/stats` ? "active" : ""}>
                        <a href={ `${path}/stats`}>Website Statistics</a>
                    </li>
                    <li>
                        <a id="blogDropdown" href="#blogSubmenu" data-toggle="collapse" aria-expanded="true" className="clearfix">
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
            <button id="collapse-button" className={sidebarVisible ? "active" : ""} onClick={ () => { setSidebarVisible(!sidebarVisible) }}>
                <i className={"fas " + ( sidebarVisible ? "fa-angle-double-left" : "fa-angle-double-right")}></i>
            </button>
        </div>
    )
}

export default AdminSidebar;