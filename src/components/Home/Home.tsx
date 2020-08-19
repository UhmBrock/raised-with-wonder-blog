/**
 * External
 */
import React, { useEffect } from 'react';
import Axios from 'axios';
/**
 * Types
 */
import type { blogPost } from '../../../rww-backend/dbTypes';
/**
 * Components
 */
import BlogPreview from './BlogPreview/BlogPreview';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import Config from '../../externals/config';
/**
 * Media/Resources
 */
import "./Home.scss";
import banner_image from '../../images/rww-banner.png';
import { dbUtilities } from '../../externals/dbTools';

interface HomeProps {

}

interface HomeState {
    blogPosts: Array<blogPost>;
}

export default class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps){
        super(props);

        this.state = {
            blogPosts: []
        };
        
    }

    componentDidMount() {

        Axios({
            method: "GET",
            url: `${Config.getBackendURL()}/blog/top/3`,
        }).then(res => {
            this.setState({blogPosts: res.data});
        });

    }

    render() {

        return (
            <div>
                <ResponsiveImage elementID="page-header-image" additionalClasses="mb-4" src={banner_image}/>

                <div className="row">
                    <div className="offset-lg-1 col-lg-6 border-pink" id="blog-column">


                        { 
                        // Generate the previews for each of the most recent blog posts
                        this.state.blogPosts.map(
                            (blogPost) => {
                                return (
                                    <BlogPreview blogPost={blogPost} />
                                );
                            }
                        )

                        }
                    </div>
                    <div className="offset-lg-1 col-lg-3">
                        <div className="border-pink my-4" id="about_me_box">
                            About Me Section
                        </div>
                        <div className="border-pink" id="archive_section">
                            Archive Section
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}