import type { Request, Response } from 'express-serve-static-core';
import DatabaseConnection from '../db_connect';
import { publishing_location } from '../dbTypes';
import { dbDefaults } from '../../src/externals/dbTools';
import { QueryResult } from 'pg';


const bodyParser = require('body-parser');
const router = require('express').Router();
const pool = DatabaseConnection.getDatabaseConnection();

/**
 * Table Properties
 */
const TABLE_NAME = "publishing_locations";


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
        `SELECT * from ${TABLE_NAME}`, [], 
        (err, result: QueryResult<publishing_location[]>) => {
            if(err) {
                throw err;
            }

            res.json(result.rows);
            console.log("Sent publishing locations");
        }
    );
});

export default router;