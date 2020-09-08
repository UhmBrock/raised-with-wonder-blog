import React, { FunctionComponent, useState } from 'react';

import "../../css/Admin-Sidebar.scss";
import { useLocation, useRouteMatch } from 'react-router-dom';

interface ASProps {

}

const AdminSidebar: FunctionComponent<ASProps> = (props: ASProps) => {

    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const { path } = useRouteMatch();
    const location = useLocation();

    // Decide which submenu should be open
    const pathSteps = location.pathname.split('/');
    const imageSubActive = pathSteps[2] === "images";
    const blogSubActive = pathSteps[2] === "blogs" || (!imageSubActive);

    return (
        <div id="sidebar-wrapper" className={"nav " + (sidebarVisible ? "" : "active")}>
            <nav id="sidebar">
                <div className="sidebar-header">
                    raised with wonder
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
                    <li>
                        <a href={ `${path}/stats`}>Website Statistics</a>
                    </li>
                    <li>
                        <a id="blogDropdown" href="#blogSubmenu" data-toggle="collapse" aria-expanded={ blogSubActive ? "true" : "false" } className="clearfix">
                            <span>Manage Blog Posts</span><i className="fas fa-caret-down"/>
                        </a>
                        <ul className={"collapse list-unstyled " + (blogSubActive ? "show" : "")} id="blogSubmenu">
                            <li>
                                <a href={`${path}/blogs/view`}><i className="fas fa-edit"/> View/Edit Blog Posts</a>
                            </li>
                            <li>
                                <a href={`${path}/blogs/publish`}><i className="fas fa-paper-plane"/> Manage Publication Status</a>
                            </li>
                            <li>
                                <a href={`${path}/blogs/create`}><i className="fas fa-plus"/> Create Blog Post</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a id="imageDropdown" href="#imageSubmenu" data-toggle="collapse" aria-expanded={ imageSubActive ? "true" : "false" } className="clearfix">
                            <span>Manage Images</span><i className="fas fa-caret-down"/>
                        </a>
                        <ul className={"collapse list-unstyled " + (imageSubActive ? "show" : "")} id="imageSubmenu">
                            <li>
                                <a href={`${path}/images/view`}><i className="fas fa-images"/> View Uploaded Images</a>
                            </li>
                            <li>
                                <a href={`${path}/images/featured`}><i className="fas fa-sliders-h"/> Manage Featured Images</a>
                            </li>
                            <li>
                                <a href={`${path}/images/upload`}><i className="fas fa-upload"/> Upload an Image</a>
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