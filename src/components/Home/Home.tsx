import React from 'react';
import axios from 'axios';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import BlogEntry from '../BlogEntry/BlogEntry';

import banner_image from '../../images/rww-banner.png';

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
                        <BlogEntry />
                    </div>
                    <div className="offset-lg-1 col-lg-3" id="archive-column">
                        Archive Column
                        <p>
                            { async () => { return await axios.get('localhost:5000/api/getList') }}
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}