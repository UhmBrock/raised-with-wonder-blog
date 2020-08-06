import React from 'react';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import blog_image from '../../images/color_swatches.jpg';
import { blogPost } from '../../../rww-backend/dbTypes';

interface BlogPreviewProps {
    blogPost: blogPost
}

interface BlogPreviewState {

}

export default class BlogPreview extends React.Component<BlogPreviewProps, BlogPreviewState>{

    render() {
        return (
            <div className="my-4 p-4">
                { <ResponsiveImage src={blog_image} additionalClasses="my-4"/> }
                
                <h1>{this.props.blogPost.title}</h1>
                <h3>Created: {this.props.blogPost.date_created.substr(0, 10)}</h3>
                <h3>Updated: {this.props.blogPost.date_modified.substr(0, 10)}</h3>
                <div dangerouslySetInnerHTML={ {__html: this.props.blogPost.html} }>
                </div>
                <div
                    className="fb-like"
                    data-share="true"
                    data-width="450"
                    data-href="https://raisedwithwonder.com"
                    data-show-faces="true">
                </div>

            </div>
        )
    }


}