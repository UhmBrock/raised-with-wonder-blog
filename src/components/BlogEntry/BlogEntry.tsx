import React from 'react';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import blog_image from '../../images/color_swatches.jpg';

interface BlogEntryProps {

}

interface BlogEntryState {

}

export default class BlogEntry extends React.Component {

    render() {
        return (
            <div>
                <ResponsiveImage src={blog_image} additionalClasses="my-4"/>
                
            </div>
        )
    }


}