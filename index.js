const path = require("path");
const favicon = require('serve-favicon'); //favicon
const express = require("express"); //express module which is our server
require("dotenv").config({ path: path.resolve(__dirname, './.env') })  
const app = express();  // app creates an application  to set up our server

const applicationRouter = require("./routes/apply"); //import apply router
app.use('/apply', applicationRouter); //mounts apply router to '/apply'
const welcomeRouter = require("./routes/welcome"); //import welcome router
app.use('/welcome', welcomeRouter); //mounts welcome router to '/welcome'
const archiveRouter = require("./routes/archive"); //import archive router
app.use('/archive', archiveRouter); //mounts archive router to '/welcome'


const portNumber = process.env.PORT || 3000;
const prompt = "Stop to shutdown the server: ";
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));

app.use(express.static(__dirname + '/public'));//for static files

app.listen(portNumber); //app will run on this server  
app.set("views", path.resolve(__dirname, "views")); //local directory where templates will reside
app.set("view engine", "ejs"); //allows us to use ejs
const bodyParser = require("body-parser"); // handles post paramer
app.use(bodyParser.urlencoded({extended:false})); //allows middleware body parsing

console.log(`Web server is running at http://localhost:${portNumber}`);
process.stdout.write(prompt);
process.stdin.setEncoding("utf8"); //encoding



//Our home page
app.get("/", (req, res) => {
    res.render("index");
});


//event listener
process.stdin.on('readable', () => {  
	let dataInput = process.stdin.read();
	if (dataInput !== null) {
		let command = dataInput.trim(); 
		if (command === "stop") {
            //shut down the server
			console.log("Shutting down the server");
            process.exit(0);
        } else {
			//inavlid input
			console.log(`Invalid command: ${command}`);
		}
        //ask the user again
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});