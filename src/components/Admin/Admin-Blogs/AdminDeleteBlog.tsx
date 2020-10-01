import { useRouteMatch } from "react-router-dom";
import { blogPost } from "../../../../rww-backend/dbTypes";
import React, { useEffect, useState } from "react";
import { dbRequest } from "../../../externals/dbTools";
import Config from "../../../externals/config";

const AdminDeleteBlog: React.FunctionComponent = () => {

    const match = useRouteMatch<{title: string}>();

    const [blogPostObj, setBlogPost] = useState<blogPost>();
    const [deleted, setDeleted] = useState<boolean>(false);
    /**
     * Find the blog post to be deleted
     */
    useEffect(
        () => {
            dbRequest.Blogs.get(match.params.title)
            .then(
                (response) => {
                    setBlogPost(response.data);
                } 
            ) 
            .catch(
                (reason) => {
                    console.log("Could not find blog");
                }
            )
        },
        [match]
    );

    /**
     * Upon finding the blog post, delete it
     */
    useEffect(
        () => {
            if(blogPostObj === undefined) return;
            
            console.log("this got deleted");
            dbRequest.Blogs.delete(blogPostObj);
            setDeleted(true);
        },
        [blogPostObj, setBlogPost]
    );

    if(deleted === true) {
        console.log("this got redirected");
        window.location.href = `${Config.getFrontendURL()}/admin/blogs/view`;
    } 
    
    return (
        <div>
            <h1>Deleting Blog: {match.params.title}</h1>
            <h1>BlogPost: {blogPostObj?.id}</h1>
            <h1>Deleted? : {deleted.toString()}</h1>
        </div>
    );

}

export default AdminDeleteBlog;