import DatabaseConnection from './db_connect';
import { Request, Response } from 'express';
import authRoutes from './routes/auth-routes';
import blogRoutes from './routes/blog-routes';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const pool = DatabaseConnection.getDatabaseConnection();
const app = express();

// Read in environment variables
dotenv.config();


// Enable Cross Origin Resource Sharing
app.use(cors());

// Authorization routes
app.use('/auth', authRoutes);

app.use('/blog', blogRoutes);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

app.listen(process.env.SERVER_PORT, function() {
    console.log("App is listening on port " + process.env.SERVER_PORT);
}); 

