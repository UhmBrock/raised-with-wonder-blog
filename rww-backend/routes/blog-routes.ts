import type { Request, Response } from 'express';
import DatabaseConnection from '../db_connect';

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
        (err, result) => {
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
        (err, result) => {
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
        (err, result) => {
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



export default router;