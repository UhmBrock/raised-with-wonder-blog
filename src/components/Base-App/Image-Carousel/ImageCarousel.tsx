import React from 'react';

import slide1 from '../../../images/slide1.jpg';
import slide2 from '../../../images/slide2.jpg';
import slide3 from '../../../images/slide3.jpg';


import "./ImageCarousel.scss";

interface IC_Props {

}

interface IC_State {

}

export default class ImageCarousel extends React.Component<IC_Props, IC_State> {

    render() {
        return (
            <div id="carousel-featured" className="carousel slide mb-2" data-ride="carousel">

                { /* Indicators along bottom of the carousel */ }
                <ol className="carousel-indicators">
                    <li data-target="#carousel-featured" data-slide-to="0" className="active"/>
                    <li data-target="#carousel-featured" data-slide-to="1" className="active"/>
                    <li data-target="#carousel-featured" data-slide-to="2" className="active"/>
                </ol>

                { /* Slide Contents https://via.placeholder.com/1024x600 */ }
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block" src={"https://via.placeholder.com/2850x691"} alt="First Slide"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First Slide Label</h5>
                            <p>Short caption to describe the content in the image</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block portrait" src={slide2} alt="Second Slide"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second Slide Label</h5>
                            <p>Short caption to describe the content in the image</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block portrait" src={slide3} alt="Third Slide"/>
                    </div>
                </div>

                { /* Next/Prev arrows */ }
                <a className="carousel-control-prev" href="#carousel-featured" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carousel-featured" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>

            </div>
        )
    }
}