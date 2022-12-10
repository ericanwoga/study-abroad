const express = require("express");
const router = express.Router(); //works like app. 
const bodyParser = require("body-parser"); // handles post paramer
router.use(bodyParser.urlencoded({extended:false})); //allows middleware body parsing
const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseAndCollection = {db: "studyAbroad_DB", collection:"students"};
const { MongoClient, ServerApiVersion } = require('mongodb');

//show welcome page
router.get("/Barcelona", (req, res) => { 
    let obj={
        welcome: "¡Bienvenidos",
        location: "Barcelona, Spain"
    }
    res.render("welcome", obj);

}).get("/CapeTown", (req, res) => {
    let obj={
        welcome: "Welkom",
        location: "Cape Town, South Africa"
    } 
    res.render("welcome", obj);

}).get("/Florence", (req, res) => { 
    let obj={
        welcome: "Benvenuto",
        location: "Florence, Italy"
    } 
    res.render("welcome", obj);

}).get("/London", (req, res) => { 
    let obj={
        welcome: "Welcome",
        location: "London, United Kingdom"
    } 
    res.render("welcome", obj);

}).get("/Nice", (req, res) => {
    let obj={
        welcome: "Bienvenue",
        location: "Nice, Frace"
    }  
    res.render("welcome", obj);

}).get("/Tokyo", (req, res) => { 
    let obj={
        welcome: "ようこそ",
        location: "Tokyo, Japan"
    } 
    res.render("welcome", obj);

})


module.exports = router;