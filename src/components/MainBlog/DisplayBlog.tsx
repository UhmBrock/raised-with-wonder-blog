import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dbRequest } from '../../externals/dbTools';
import { blogPost } from '../../../rww-backend/dbTypes';

interface displayBlogProps {

}

const DisplayBlog: React.FunctionComponent<displayBlogProps> = (props: displayBlogProps) => {
    
    const match = useRouteMatch<{title: string}>();
    const [blogPost, setblogPost] = useState<blogPost>(); 

    useEffect(() => {
        dbRequest.getBlog(match.params.title)
        .then( (response) => {
            setblogPost(response.data);
        })
        .catch( (err) => {
            if(err) {
                console.log(err);
                return;
            }
        });
    }, [match.params.title]);

    return (
        <div className="container">
            {blogPost !== undefined 
            ? <div dangerouslySetInnerHTML={ {__html: blogPost.html} } />
            : <h1>404</h1> }
        </div>

    )
    
}

export default DisplayBlog; 