import React from 'react';
import './NavBar.scss';

interface NavbarProps {

}

interface NavbarState {

}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {


    render() {
        return (
            <header className="navbar fixed-top navbar-expand-lg"> 
                <a className="navbar-brand ml-5 my-2" href="/home">
                    raised with wonder
                </a>

                { /** collapse button */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto" id="navbar-section-list">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about-me">About Me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/blog">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ophiebee">OphieBee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/homeschool">Homeschool</a>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse">
                    <span className="navbar-nav ml-auto mr-5">
                        <a className="mx-3 social-square" href="https://www.youtube.com/channel/UCHc75m64K2PbIEjgJXZPNEg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-youtube-play"/>
                        </a>
                        <a className="mx-3 social-square" href="https://www.instagram.com/raisedwithwonder/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram"/>
                        </a>
                        <a className="mx-3 social-square" href="https://www.pinterest.com/raisedwithwonder/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-pinterest-p"/>
                        </a>
                    </span>
                </div>
            </header>
        )
    }
}