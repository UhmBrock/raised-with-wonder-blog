import React, { FunctionComponent, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import "../../../css/ResponsiveImage.scss";

// Import TinyMCE
import { Editor } from '@tinymce/tinymce-react';
import {dbRequest, dbDefaults} from '../../../externals/dbTools';
import Config from '../../../externals/config';
import Axios from 'axios';
import { blogPost } from '../../../../rww-backend/dbTypes';

interface ACBProps {
    editMode?: boolean;
}



const AdminEditBlogContent: FunctionComponent<ACBProps> = (props) => {
    
    const match = useRouteMatch<{title: string}>();
    const [blogPostObj, setblogPost] = useState<blogPost>(dbDefaults.blogPost_default()); // TODO Set this to be some actual values

    useEffect(() => {
        // Only query if we are in edit mode
        if(props.editMode) {
            
            dbRequest.Blogs.get(match.params.title)
            .then( (response) => {
                setblogPost(response.data);
            })
            .catch( (err) => {
                if(err) {
                    console.log(err);
                    return;
                }
            });

        }
    }, [match.params.title, props.editMode])
        
    return (
        <div id="editor-wrapper">

            <form action={`${Config.getBackendURL()}/blog/upload`}  method="POST">
                <Editor
                    apiKey="o4g5kb8cmig71uhnkjb5kn5r540lg89kn646mvrzish0s4j0"
                    value={blogPostObj?.html}
                    disabled={!props.editMode}
                    init={
                    {
                        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                        imagetools_cors_hosts: ['picsum.photos'],
                        menubar: 'file edit view insert format tools table help',
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                        toolbar_sticky: true,
                        autosave_ask_before_unload: true,
                        autosave_interval: "30s",
                        autosave_prefix: "{path}{query}-{id}-",
                        autosave_restore_when_empty: false,
                        autosave_retention: "2m",
                        image_advtab: true,
                        resize: false,
                        height: "100vh",
                        width: "100%",

                        formats: {
                            'Featured Image': { selector: "img", classes: "featured-image"}
                        },

                        save_onsavecallback:  editor_saveCallback
                    }}       
                    
                    textareaName="blogEditor"
                    outputFormat="html"
                    onEditorChange={ (content: string) => {
                        let newBlogpost = blogPostObj;
                        newBlogpost.html = content;
                        setblogPost(newBlogpost);
                    }}
                />
                <input type="submit" style={{display: "none"}} name="submitbtn" value="Submit"/>
            </form>
    </div>
    )



    function editor_saveCallback() {
    
        Axios(`${Config.getBackendURL()}/blog/upload`,
            {
                data: blogPostObj,
                method: "POST",
            }
        );  
    
    }


}



export default AdminEditBlogContent