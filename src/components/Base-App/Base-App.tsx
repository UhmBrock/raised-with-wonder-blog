import React from 'react';
import Navbar from '../NavBar/Navbar';
import './base-app.scss';

import blog_image from '../../images/color_swatches.jpg';
import banner_image from '../../images/rww-banner.png';

interface BaseAppProps {

}

interface BaseAppState {

}

export default class BaseApp extends React.Component<BaseAppProps, BaseAppState> {

    render() { 
        return (
            <div>
                <Navbar />
                <div className="container-fluid" style={{height: '3000px' }} id="base-app-container">
                    
                    <div className="row mb-4">
                        <div className="offset-lg-1 col-lg-10">
                            { /* https://via.placeholder.com/3000x240 */ }
                            <img id="page-header-image" className="mx-auto" src={banner_image} alt="raised with wonder banner"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="offset-lg-1 col-lg-6" id="blog-column">
                            
                            <img src={ blog_image } className="blog-featured-image" alt="blog feature"/>

                        </div>
                        <div className="offset-lg-1 col-lg-3" id="archive-column">
                            Archive Column
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}