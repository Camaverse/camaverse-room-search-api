require('dotenv').config();
const bodyParser = require( 'body-parser' );
const colors = require('colors');
const cors = require( 'cors' );
const express = require( 'express' );
const http = require( 'http' );
const morgan = require( 'morgan' );
const mongoose = require( 'mongoose' );
const router = require( './router' );
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();
const server = http.createServer( app );
const port = process.env.PORT;
const env = process.env.ENV_NAME;

/*_____ APP SETUP _____*/
// Log reqs to STDOUT
app.use( morgan( 'combined' ) );
// Enable CORS (Origin: *)
app.use( cors() );
// Parse reqs as JSON
app.use( bodyParser.json({ type: '*/*' }) );
// Init router
router( app, redisClient );

/*_____ DB SETUP _____*/
// redis connection
redisClient.on('error', function (err) {
    console.log(`Error ${err}`);
});
// Connect Mongoose to local instance of MongoDB
mongoose.connect( 'mongodb://localhost/test', { useNewUrlParser: true } );


/*_____ SERVER SETUP _____*/
// Listen on port
server.listen( port );
console.log( '/*-----------*/'.grey)
console.log( 'Welcome!')
console.log( 'Camaverse Videoroom Search Service'.blue)
console.log( `Listening on port ${port}`.red );
console.log( `Environment ${env}`.green);
console.log( '/*-----------*/'.grey)
