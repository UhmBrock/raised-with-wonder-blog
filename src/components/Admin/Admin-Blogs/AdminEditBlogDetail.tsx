import React, { useState, useEffect } from 'react';
import { dbRequest, dbUtilities, dbDefaults } from '../../../externals/dbTools';
import Config from '../../../externals/config';
import { tag, publishing_location } from '../../../../rww-backend/dbTypes';
import { response } from 'express';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { redirect } from 'express/lib/response';
import { EditorPropTypes } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes';
import Axios from 'axios';

interface DetailProps {
    editMode?: boolean;
}


const AdminEditBlogDetail: React.FunctionComponent<DetailProps> = (props) => {

    const match = useRouteMatch<{title: string}>();
    
    const [title, setTitle] = useState<string>(match.params.title);
    const [featured_image, setFeatured_image] = useState<string>("");
    const [excerpt, setExcerpt] = useState<string>("");
    const [tags, setTags] = useState<tag[]>([]);
    const [publishingLocations, setPublishingLocations] = useState<publishing_location[]>([]);
    const [publishingData, setPublishingData] = useState<Array<{locationName: string, checked: boolean}>>([]);
    const [alert, setAlert] = useState<JSX.Element | undefined>();


    /**
     * Get all tags to populate the form with
     * Run only once
     */
    useEffect(() => {
        dbRequest.Tags.getAll()
        .then( (response) => {
            setTags(response.data);
        })
    }, [])

    /**
     * Get all publishing locations to populate the form with
     * Run only once
     */
    useEffect(() => {
        dbRequest.PublishLocations.getAll()
        .then( (response) => {
            setPublishingLocations(response.data);
        })
    }, []);

    /**
     * Find the blog and set each of the published checkboxes according to the database
     * Run upon blog title changing, or publishingLocations changing
     */
    useEffect(() => {
        dbRequest.Blogs.getPublishedLocations(match.params.title)
        .then( (response) => {
            
            const locationData: Array<{ locationName: string, checked: boolean}> = [];

            for(const location of publishingLocations) {

                let record = { locationName: location.location_name, checked: false};
                
                for(const data of response.data) {
                    if(data.location_name === location.location_name) {
                        record.checked = true;
                        break;
                    }
                }

                locationData.push(record);
            }

            setPublishingData(locationData);
        })
    }, [publishingLocations, match.params.title]);

    /**
     * Get the blog and assign the default values to each of the fields
     */
    useEffect(() => {
        dbRequest.Blogs.get(match.params.title)
        .then( (response) => {
            const blog = response.data;
            setTitle(blog.title);
            setExcerpt(blog.excerpt);
        })
    }, [match.params.title])

    const handleSubmit = (event: React.FormEvent) => {
        
        // Cancel the submission to handle it manually
        event.preventDefault();

        dbRequest.Blogs.get(dbUtilities.serializeTitle(title))
        .then( (response) => {
            // Blog exists, update it if we are in edit mode and the title has not been changed
            if(!props.editMode || match.params.title !== dbUtilities.serializeTitle(title)) {
                setAlert(
                <div className="alert alert-danger" role="alert">
                    Blog already exists! Saved edited version.    
                </div>);
                return;
            }
            
            const blogPost = response.data;
            blogPost.title = title;
            blogPost.featured_image = featured_image;
            blogPost.excerpt = excerpt;

            // TODO Set tags and published

            Axios(`${Config.getBackendURL()}/blog/upload`,
            {
                data: blogPost,
                method: "POST",
            });
        })
        .catch((err) => {
           // ! Blog does not exist in system, create a new one

            const blogPost = dbDefaults.blogPost_default();

            blogPost.title = title;
            blogPost.featured_image = featured_image;
            blogPost.excerpt = excerpt;
            
            Axios(`${Config.getBackendURL()}/blog/upload`,
            {
                data: blogPost,
                method: "POST",
            });

            // Redirect to view blog
            window.location.href = `${Config.getFrontendURL()}/admin/blogs/edit/${title}`;

        });

    }


    return (
        <div className="container">
            <h1 className="my-5 text-center">Create New Blog Post</h1>
            { alert }
            <form className="my-5" onSubmit={handleSubmit}>
                {formGroupRow("Title", 
                    <input className="form-control form-control-lg" type="text" value={title} onChange={ e => setTitle(e.target.value)}/>
                )}

                {formGroupRow("Image",
                    <input className="form-control form-control-lg" type="file"/>
                )}

                {formGroupRow("Excerpt", 
                    <textarea className="form-control form-control-lg" style={{height: '200px'}} value={excerpt} onChange={ e => setExcerpt(e.target.value)} />
                )}
                {/** TODO Rewrite this to be a dropdown selection that is populated with all tags, have the option of a search box or a button to create a new tag */}
                {formGroupRow("Tags", 
                    <input list="tags"/>
                )}
                { /** Published Checkbox*/}
                {formGroupRow("Published",
                    getCheckboxes(publishingData, setPublishingData)
                )}
                <div className="form-group row">
                    <input className="btn btn-primary col-10" type="submit" value="Save"/>
                </div>
            </form>
        </div>
    )
}

/**
 * 
 * @param labelText The text for the input label
 * @param input The form element
 */
const formGroupRow = (labelText: string, input: JSX.Element | JSX.Element[]): JSX.Element  => {
    return (
        <div className="form-group row">
            <label className="col-2 col-form-label-lg">{labelText}</label>
            <div className="col-8">
                {input}
            </div>
        </div>
    )
};

const getCheckboxes = (publishingData: Array<{locationName: string, checked: boolean}>, setPublishingData: React.Dispatch<React.SetStateAction<{
    locationName: string;
    checked: boolean;
}[]>>): JSX.Element[] => {

    const elements: Array<JSX.Element> = [];

    const numCheckboxRows = Math.ceil(publishingData.length / 3);

    for( let j = 0; j < numCheckboxRows; j++) {

        let rowElements: Array<JSX.Element> = [];

        for(let i = 0; i < 3; i++ ){
            
            let index = j * 3 + i;

            rowElements.push(<span className="col"><label className="checkbox-inline"><input type="checkbox" className="form-control" checked={publishingData[i].checked} onClick={ e => {
                const newPublishingData = [ ...publishingData ];
                newPublishingData[index].checked = !newPublishingData[index].checked;

                setPublishingData(newPublishingData);
            }}/>{publishingData[index].locationName}</label></span>);

        }

        elements.push(
            <div className="row">
                {rowElements}
            </div>
        );

    }

        
    return elements;

};

export default AdminEditBlogDetail;