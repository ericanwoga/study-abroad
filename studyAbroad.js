const path = require("path");
const favicon = require('serve-favicon'); //favicon
const express = require("express"); //express module which is our server
require("dotenv").config({ path: path.resolve(__dirname, './.env') })  
const app = express();  // app creates an application  to set up our server

const applicationRouter = require("./routes/apply"); //import apply router
app.use('/apply', applicationRouter); //mounts apply router to /apply

const portNumber = 3000;
const prompt = "Stop to shutdown the server: ";
app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.listen(portNumber); //app will run on this server  
app.set("views", path.resolve(__dirname, "views")); //local directory where templates will reside
app.set("view engine", "ejs"); //allows us to use ejs
const bodyParser = require("body-parser"); // handles post paramer
app.use(bodyParser.urlencoded({extended:false})); //allows middleware body parsing

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

// Our database and collection 
const databaseAndCollection = {db: "studyAbroad_DB", collection:"students"};
const { MongoClient, ServerApiVersion } = require('mongodb');


console.log(`Web server is running at http://localhost:${portNumber}`);
process.stdout.write(prompt);
process.stdin.setEncoding("utf8"); //encoding



//Our home page
app.get("/", (req, res) => {
    res.render("index");
});


