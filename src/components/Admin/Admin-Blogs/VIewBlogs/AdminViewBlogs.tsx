// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { blogPost } from '../../../../../rww-backend/dbTypes';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../Table/Table';
import { dbRequest, dbUtilities } from '../../../../externals/dbTools';
import Config from '../../../../externals/config';

interface ViewProps {

}

interface TableData {
    "Title": string;
    "Published": string;
    "View": JSX.Element;
    "Edit": JSX.Element;
    "Date Created": string;
    "Date Modified": string;
}

const AdminViewBlogs: React.FunctionComponent<ViewProps> = () => {    

    const [tableData, setTableData] = useState<TableData[]>([])

    useEffect( () => {
        dbRequest.getAllBlogs()
        .then( (response) => {

            const newTableData: TableData[] = response.data.map( (blogPost: blogPost) => {
                return {
                    "Title": dbUtilities.deserializeTitle(blogPost.title),
                    "Published": "True", // TODO
                    "View": <a href={`${Config.getFrontendURL()}/blog/${blogPost.title}`}>View Post</a>,
                    "Edit": <a href={`${Config.getFrontendURL()}/admin/blogs/edit/${blogPost.title}`}>Edit Post</a>,
                    "Date Created": dbUtilities.getPrettyDate(blogPost.date_created),
                    "Date Modified": dbUtilities.getPrettyDate(blogPost.date_modified)
                }
            })

            setTableData(newTableData);
        });
    }, []); 

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="offset-2 col-8">
                    { tableData.length > 0 
                        ? <DataTable data={ tableData }/> 
                        : <h3 className="py-5"style={{textAlign: "center"}}> No data received. </h3> }
                </div>

            </div>
        </div>
    )

}


export default AdminViewBlogs;