import type { Request, Response } from 'express-serve-static-core';
import DatabaseConnection from '../db_connect';
import { blogPost, publishing_location } from '../dbTypes';
import { route } from 'express/lib/application';
import { QueryResult } from 'pg';
import { dbUtilities } from '../../src/externals/dbTools';


const bodyParser = require('body-parser');

const router = require('express').Router();

const pool = DatabaseConnection.getDatabaseConnection();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});


// /blog/all/ 
// ---- Get all blogs
router.get('/all/', (req: Request, res: Response) => {
    pool.query(
        "SELECT * from blogs", [], 
        (err, result: QueryResult<blogPost[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
            console.log("Sent blog posts");
        }
    );
});

// /blog/top/{number}
// ---- Get the {number} most recent blogs
router.get('/top/:number', (req: Request, res: Response) => {
    pool.query(
        "SELECT * FROM blogs ORDER BY date_created LIMIT $1", [req.params["number"]],
        (err, result: QueryResult<blogPost[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
        }
    )
})

// /blog/{title} 
// ---- Get a specific blog
router.get('/:blogTitle', (req: Request, res: Response) => {
    pool.query(
        "SELECT * from blogs WHERE title=$1", [req.params["blogTitle"]],
        (err, result: QueryResult<blogPost>) => {
            if(err) {
                throw err;
            }

            if(result.rowCount === 0) {
                res.sendStatus(404);
            }

            res.json(result.rows[0]);
        }
    )
});

// /blog/{title}/publishedIn
// ---- Get a specific blog, return only the locations IDs it is published in
router.get('/:blogTitle/publishedIn', (req: Request, res: Response) => {
    pool.query(
        "SELECT pub.* FROM blogs " +
        "LEFT OUTER JOIN blogs_publishing_locations_m2m m2m ON m2m.blogid = blogs.id " +
        "LEFT OUTER JOIN publishing_locations pub ON pub.id = m2m.locationid " +
        "WHERE blogs.title = $1", [req.params["blogTitle"]],
        (err, result: QueryResult<publishing_location[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
        }
    )
});

// /blog/upload
// ---- Write a blog to the database
router.post('/upload', bodyParser.json(), (req: Request, res: Response) => {

    const blogPost: blogPost = req.body;

    // editing a blog if it already has an id
    const editMode: boolean = blogPost.id !== undefined;

    let queryString = "";
    let {id, ...allExceptID} = blogPost;

    
    if(!editMode) { // Creating a new blog post

        blogPost.date_created = dbUtilities.serializeDate(new Date(Date.now()));
        blogPost.date_modified = dbUtilities.serializeDate(new Date());


        let columns = Object.keys(allExceptID).join(", ");
        let values = Object.values(allExceptID).join("', '");

        queryString = `INSERT INTO blogs ( ${columns} ) VALUES ( '${values}' );`;

    } else { // Editing an existing blog post

        blogPost.date_modified = dbUtilities.serializeDate(new Date());

        let setValues: string[] = [];

        for(let key in allExceptID) {
            setValues.push(`${key}='${allExceptID[key]}'`);
        }

        const setStatement = setValues.join(", ");

        queryString = `UPDATE blogs SET ${setStatement} WHERE id=${id}`

    }

    pool.query(
        queryString,
        (err, result) => {
            if(err) {
                throw err;
            }

            if(result.rowCount > 0) {
                
                console.log("Saved blog: " + blogPost.title);
            }
        }
    );

});

// /blog/delete
// ---- Write a blog to the database
router.post('/delete', bodyParser.json(), (req: Request, res: Response) => {

    const blogPost: blogPost = req.body;

    pool.query(
        `DELETE FROM blogs WHERE id=${blogPost.id}`,
        (err, result) => {
            if(err) {
                throw err;
            }

            if(result.rowCount > 0) {
                console.log("Deleted blog: " + blogPost.title);
            }
        }
    )

});

export default router;