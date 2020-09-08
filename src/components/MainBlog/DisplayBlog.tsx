import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dbRequest, dbUtilities } from '../../externals/dbTools';
import { blogPost } from '../../../rww-backend/dbTypes';

interface displayBlogProps {
    displayExcerpt: boolean,
    blogTitle: string
}

const DisplayBlog: React.FunctionComponent<displayBlogProps> = (props: displayBlogProps) => {
    
    const [blogPost, setblogPost] = useState<blogPost>(); 
    const [displayFull, setDisplayFull] = useState<boolean>(!props.displayExcerpt);

    useEffect(() => {
        dbRequest.Blogs.get(props.blogTitle)
        .then( (response) => {
            setblogPost(response.data);
        })
        .catch( (err) => {
            if(err) {
                console.log(err);
                return;
            }
        });
    }, [props.blogTitle]);

    if(blogPost === undefined) {
        return <div></div>
    }

    return (
        <div>

            <h2>{dbUtilities.deserializeTitle(blogPost.title)}</h2>
            <h3>{dbUtilities.getPrettyDate(blogPost.date_created)}</h3>
            <h3>{dbUtilities.getPrettyDate(blogPost.date_modified)}</h3>
            
            {
                () => {

                    if(displayFull) {
                        return (<div dangerouslySetInnerHTML={ {__html: blogPost.html}} />);
                    } else {
                        return (
                            <div>
                                <div dangerouslySetInnerHTML={ {__html: blogPost.excerpt }}/>
                                <button type="button" onClick={ () => setDisplayFull(true) }>Read More</button>
                            </div>
                        );
                    }
                }
            }

        </div>

    )
    
}

export default DisplayBlog; 