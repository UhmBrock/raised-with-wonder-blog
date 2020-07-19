import React from 'react';
import './NavBar.scss';

interface NavbarProps {

}

interface NavbarState {

}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {


    render() {
        return (
            <nav className="navbar navbar-light fixed-top navbar-expand-xl"> 
                <div className="navbar-header ml-5">
                    <a className="navbar-brand" href="/home">
                        raised with wonder
                    </a>
                </div>
                
                { /** collapse button */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbar-section-list" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <div className="navbar-nav mx-auto" id="navbar-section-list">
                        <a className="nav-item nav-link active" href="/home">Home</a>
                        <a className="nav-item nav-link" href="/about-me">About Me</a>
                        <a className="nav-item nav-link" href="/blog">Blog</a>
                        <a className="nav-item nav-link" href="/ophiebee">OphieBee</a>
                        <a className="nav-item nav-link" href="/homeschool">Homeschool</a>
                    </div>
            
                    <div className="navbar-nav mx-auto" id="navbar-social-media-list">
                        <a className="mx-3 social-square" href="https://www.youtube.com/channel/UCHc75m64K2PbIEjgJXZPNEg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-youtube-play"/>
                        </a>
                        <a className="mx-3 social-square" href="https://www.instagram.com/raisedwithwonder/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram"/>
                        </a>
                        <a className="mx-3 social-square" href="https://www.pinterest.com/raisedwithwonder/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-pinterest-p"/>
                        </a>
                    </div>
                </div> 
 
                <form className="form-inline">
                    <span className="collapse search">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    </span>
                    <span className="show">
                        <button className="btn" type="button" data-toggle="collapse" data-target=".search">
                            <span className="fa fa-search" />
                        </button>    
                    </span>
                </form>
            </nav>
        )
    }
}