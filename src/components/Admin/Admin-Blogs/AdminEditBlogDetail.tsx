import React, { useState } from 'react';
import { dbRequest, dbUtilities } from '../../../externals/dbTools';
import Config from '../../../externals/config';

interface DetailProps {
    editMode?: boolean;
}


const AdminEditBlogDetail: React.FunctionComponent<DetailProps> = () => {
    
    const [title, setTitle] = useState<string>("");
    const [excerpt, setExcerpt] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [published, setPublished] = useState<boolean>(false);

    const [alert, setAlert] = useState<JSX.Element | undefined>();


    const handleSubmit = (event: React.FormEvent) => {
        
        // Cancel the submission to handle it manually
        event.preventDefault();

        dbRequest.getBlog(dbUtilities.serializeTitle(title))
        .then( (response) => {
           
            if(response.status !== 404) {
                setAlert(
                <div className="alert alert-danger" role="alert">
                    Blog already exists! Change the title and then try again.    
                </div>);
            }
        })
        .catch((err) => {
            setAlert(<div className="alert alert-success" role="alert">
                Blog submitted successfully! Edit the post <a href={`${Config.getFrontendURL()}/admin/blogs/edit/${title}`}>here</a>!
            </div>);
        });

    }

    return (
        <div className="container">
            <h1 className="my-5  text-center">Create New Blog Post</h1>
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
                {formGroupRow("Tags", 
                    <input className="form-control form-control-lg" type="text" value={tags} onChange={ e => setTags(e.target.value)}/>
                )}
                { /** Featured Image here  */}
                { /** Published Checkbox*/}
                {formGroupRow("Published",
                    <input className="form-control form-control" type="checkbox" checked={published} onClick={ e => setPublished(!published)}/>
                )}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

/**
 * 
 * @param labelText The text for the input label
 * @param input The form element
 */
const formGroupRow = (labelText: string, input: JSX.Element): JSX.Element  => {
    return (
        <div className="form-group row">
            <label className="offset-1 col-1 col-form-label-lg">{labelText}</label>
            <div className="col-8">
                {input}
            </div>
        </div>
    )
}

export default AdminEditBlogDetail;