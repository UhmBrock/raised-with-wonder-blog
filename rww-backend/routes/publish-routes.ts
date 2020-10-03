import type { Request, Response } from 'express-serve-static-core';
import DatabaseConnection from '../db_connect';
import { blogPost, blog_m2m_publishing, publishing_location } from '../dbTypes';
import { dbDefaults, dbRequest } from '../../src/externals/dbTools';
import { QueryResult } from 'pg';


const bodyParser = require('body-parser');
const router = require('express').Router();
const pool = DatabaseConnection.getDatabaseConnection();


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});


// /publish/all/ 
// ---- Get all publishing locations
router.get('/all/', (req: Request, res: Response) => {
    pool.query(
        `SELECT * from publishing_locations`, [], 
        (err, result: QueryResult<publishing_location[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
            console.log("Sent ALL publishing locations");
        }
    );
});

// /publish/upload/
// ---- Write a blog's publishing locations to the database
router.post('/upload', bodyParser.json(), (req: Request, res: Response) => {
    
    const blogPostObj: blogPost = req.body.blogPost;
    const locations: Array<{ location: publishing_location, checked: boolean }> = req.body.locations;

    if(!blogPostObj) {
        throw new Error("Failed to receive blogpost for upload");
    }
    
    if(!locations) {
        throw new Error("Failed to receive locations for upload");
    }


    console.log(`Saved publishing locations for ${blogPostObj.title}`)

    // Delete all existing instances of the relationship
    pool.query(
        `DELETE FROM blogs_publishing_locations_m2m WHERE blogid = ${blogPostObj.id}`
    )

    // Return before inserting if there were no locations passed in. 

    console.log(JSON.stringify(locations));

    if(locations.length === 0) return;

    // Add back all selected locations
    let insertQuery = `INSERT INTO blogs_publishing_locations_m2m VALUES `;
    for(let i = 0; i < locations.length; i++) {

        if(locations[i].checked === false) continue;

        let newRow = "(";

        newRow += `${blogPostObj.id}, ${locations[i].location.id}`

        newRow += ")";
        newRow += (i < (locations.length - 1)) ? ", " : ";"; 

        insertQuery += newRow;
    }

    // Run the query for inserting the new rows
    pool.query(insertQuery)

});
export default router;