import DatabaseConnection from './db_connect';
import authRoutes from './routes/auth-routes';
import blogRoutes from './routes/blog-routes';
import tagRoutes from './routes/tag-routes';
import publishRoutes from './routes/publish-routes';

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = DatabaseConnection.getDatabaseConnection();
const app = express();

// Read in environment variables
dotenv.config();


// Enable Cross Origin Resource Sharing
app.use(cors());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// Authorization routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/tag', tagRoutes);
app.use('/publish', publishRoutes);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

app.listen(process.env.SERVER_PORT, function() {
    console.log("App is listening on port " + process.env.SERVER_PORT);
}); 

