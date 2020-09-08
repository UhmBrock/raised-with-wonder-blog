import type { Request, Response } from 'express-serve-static-core';
import DatabaseConnection from '../db_connect';
import { tag } from '../dbTypes';
import { QueryResult } from 'pg';


const bodyParser = require('body-parser');
const router = require('express').Router();
const pool = DatabaseConnection.getDatabaseConnection();

const TABLE_NAME = "tags";

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});


// /tag/all/ 
// ---- Get all tags
router.get('/all/', (req: Request, res: Response) => {
    pool.query(
        `SELECT * from ${TABLE_NAME}`, [], 
        (err, result: QueryResult<tag[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
            console.log("Sent tags");
        }
    );
});


export default router;