import DatabaseConnection from './db_connect';
import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');

const pool = DatabaseConnection.getDatabaseConnection();
const app = express();

// Enable Cross Origin Resource Sharing
app.use(cors());

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

// An API endpoint that returns a short list of items
app.get('/api/getList', (req: Request, res: Response) => {
    var list = ['item1', 'item4', 'item3'];
    res.json(list);
    console.log("Sent list of items");
});

app.get('/api/getBlog', async (req: Request, res: Response) => {
    pool.query('Select * from public.blogs where id = $1', [1], (err, result) => {
        if(err) {
            throw err;
        }

        console.log(JSON.stringify(result.rows));


        res.json(result.rows[0]['html']);
        console.log("sent blog posts");
    });
});

const port = 5000;
app.listen(port, function() {
    console.log("App is listening on port " + port);
}); 

