import React from 'react';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import banner_image from '../../images/rww-banner.png';
import blog_image from '../../images/color_swatches.jpg';

interface HomeProps {

}

interface HomeState {

}

export default class Home extends React.Component<HomeProps, HomeState> {


    render() {
        return (
            <div>
                <ResponsiveImage elementID="page-header-image" additionalClasses="mb-4" src={banner_image}/>

                <div className="row">
                    <div className="offset-lg-1 col-lg-6" id="blog-column">
                        <ResponsiveImage src={blog_image} additionalClasses="my-4"/>
                        <p style={{height: '1000px' }}>
                            test
                        </p>
                    </div>
                    <div className="offset-lg-1 col-lg-3" id="archive-column">
                        Archive Column
                    </div>
                </div>
            </div>
        )
    }
}