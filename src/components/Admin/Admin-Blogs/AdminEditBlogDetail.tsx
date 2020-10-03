import React, { useState, useEffect } from 'react';
import { dbRequest, dbUtilities, dbDefaults } from '../../../externals/dbTools';
import Config from '../../../externals/config';
import { tag, publishing_location } from '../../../../rww-backend/dbTypes';
import { useRouteMatch } from 'react-router-dom';
import Axios from 'axios';

interface DetailProps {
    editMode?: boolean;
}

type published_location_data = { location: publishing_location, checked: boolean};

const AdminEditBlogDetail: React.FunctionComponent<DetailProps> = (props) => {

    const match = useRouteMatch<{title: string}>();
    
    const [title, setTitle] = useState<string>(match.params.title);
    const [featured_image] = useState<string>("");
    const [excerpt, setExcerpt] = useState<string>("");
    const [tags, setTags] = useState<tag[]>([]);
    const [allPublishingLocations, setAllPublishingLocations] = useState<publishing_location[]>([]);
    const [publishedData, setPublishedData] = useState<published_location_data[]>([]);
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
            setAllPublishingLocations(response.data);
        })
    }, []);

    /**
     * Find the blog and set each of the published checkboxes according to the database
     * Run upon blog title changing, or publishingLocations changing
     */
    useEffect(() => {
        dbRequest.Blogs.getPublishedLocations(match.params.title)
        .then( (response) => {
            
            const locationData: published_location_data[] = [];

            for(const location of allPublishingLocations) {

                let record: published_location_data = { location: location, checked: false};
                
                for(const publishedLocation of response.data) {
                    if(publishedLocation.location_name === location.location_name) {
                        record.checked = true;
                        break;
                    }
                }

                locationData.push(record);
            }

            setPublishedData(locationData);
        })
    }, [allPublishingLocations, match.params.title]);

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

    /**
     * Handle the submission of the edit form. 
     * @param event 
     */
    const handleSubmit = (event: React.FormEvent) => {
        
        // Cancel the submission to handle it manually
        event.preventDefault();

        dbRequest.Blogs.get(dbUtilities.serializeTitle(title))
        .then( (response) => {
            // Blog exists, if we are not in edit mode or the title has changed, then throw error
            if(!props.editMode || match.params.title !== dbUtilities.serializeTitle(title)) {
                setAlert(
                <div className="alert alert-warning" role="alert">
                    {props.editMode}
                    {match.params.title} === {dbUtilities.serializeTitle(title)}
                </div>);
                return;
            }
            
            // Update and save the blog details
            const blogPost = response.data;
            blogPost.title = title;
            blogPost.featured_image = featured_image;
            blogPost.excerpt = excerpt;
            Axios(`${Config.getBackendURL()}/blog/upload`,
            {
                data: blogPost,
                method: "POST",
            });

            // TODO Set tags and published and save to DB seperately
            // Update and save the publishing locations
            Axios(`${Config.getBackendURL()}/publish/upload`,
            {
                data: {
                    blogPost: blogPost,
                    locations: publishedData
                },
                method: "POST",
            });
            
            // Redirect to view blog
            window.location.href = `${Config.getFrontendURL()}/admin/blogs/edit/${title}`;
        })
        .catch(() => {
           // Blog does not exist in system, create a new one

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
                    getCheckboxes(publishedData, setPublishedData)
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

const getCheckboxes = (publishedData: published_location_data[], setPublishedData: React.Dispatch<React.SetStateAction<published_location_data[]>>): JSX.Element[] => {

    const elements: Array<JSX.Element> = [];

    const numCheckboxRows = Math.ceil(publishedData.length / 3);

    for( let j = 0; j < numCheckboxRows; j++) {

        let rowElements: Array<JSX.Element> = []; 

        for(let i = 0; i < 3; i++ ){
            
            let index = j * 3 + i;

            rowElements.push(<span className="col"><label className="checkbox-inline"><input type="checkbox" className="form-control" checked={publishedData[i].checked} onClick={ () => {
                const newPublishingData = [ ...publishedData ];
                newPublishingData[index].checked = !newPublishingData[index].checked;

                setPublishedData(newPublishingData);
            }}/>{publishedData[index].location.location_name}</label></span>);

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