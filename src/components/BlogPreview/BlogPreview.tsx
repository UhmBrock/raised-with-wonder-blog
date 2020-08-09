import React from 'react';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import blog_image from '../../images/color_swatches.jpg';
import { blogPost } from '../../../rww-backend/dbTypes';
import { dbUtilities } from '../../externals/dbTools';

interface BlogPreviewProps {
    blogPost: blogPost
}

interface BlogPreviewState {

}

export default class BlogPreview extends React.Component<BlogPreviewProps, BlogPreviewState>{

    render() {
        return (
            <div className="my-4 p-4">
                {
                    // { <ResponsiveImage src={blog_image} additionalClasses="my-4"/> }
                }
                
                <h1>{dbUtilities.deserializeTitle(this.props.blogPost.title)}</h1>
                <p>Created: {dbUtilities.getPrettyDate(this.props.blogPost.date_created)}<br/>
                   Created Time: { dbUtilities.getPrettyTime(this.props.blogPost.date_created)}<br/>
                   Updated: {dbUtilities.getPrettyDate(this.props.blogPost.date_modified)}<br/>
                   Updated Time: { dbUtilities.getPrettyTime(this.props.blogPost.date_modified)}
                </p>
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