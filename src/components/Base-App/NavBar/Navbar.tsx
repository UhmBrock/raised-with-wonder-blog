import React from 'react';
import {
    NavLink
} from 'react-router-dom';
import './NavBar.scss';

const YOUTUBE_LINK = "https://www.youtube.com/channel/UCHc75m64K2PbIEjgJXZPNEg?view_as=subscriber";
const INSTAGRAM_LINK = "https://www.instagram.com/raisedwithwonder/";
const PINTEREST_LINK = "https://www.pinterest.com/raisedwithwonder/";

interface NavbarProps {

}

interface NavbarState {

}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {


    render() {
        return (
            <nav id="mainNav" className="navbar nav-pills navbar-light fixed-top navbar-expand-xl"> 
                <div className="navbar-header">
                    <a className="navbar-brand ml-3" href="/home">
                        raised with wonder
                    </a>
                </div>
                
                { /** collapse button */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbar-section-list" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse w-75">
                    <div className="navbar-nav mx-auto" id="navbar-section-list"> 
                        <NavLink exact to="/" activeClassName="active" className="nav-item nav-link">Home</NavLink>
                        <NavLink to="/blog" activeClassName="active" className="nav-item nav-link">Blog</NavLink>
                        <NavLink to="/ophiebee" activeClassName="active" className="nav-item nav-link">OphieBee</NavLink>
                        <NavLink to="/homeschool" activeClassName="active" className="nav-item nav-link">Homeschool</NavLink>
                    </div>
            
                    <div className="navbar-nav mx-auto" id="navbar-social-media-list">
                        <a className="mr-3 social-square" href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube"/>
                        </a>
                        <a className="ml-1 mr-2 social-square" href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"/>
                        </a>
                        <a className="ml-1 social-square" href={PINTEREST_LINK} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-pinterest"/>
                        </a>
                    </div>
                </div> 
 
                <div className="collapse navbar-collapse">
                    <form className="form-inline ml-auto">
                        <span className="collapse search">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        </span>
                        <span className="show">
                            <button id="navbar-search-button" className="btn" type="button" data-toggle="collapse" data-target=".search">
                                <span className="fas fa-search" />
                            </button>    
                        </span>
                    </form>
                </div>
            </nav>
        )
    }
}