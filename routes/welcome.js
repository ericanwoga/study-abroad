const express = require("express");
const router = express.Router(); //works like app. 
const bodyParser = require("body-parser"); // handles post paramer
router.use(bodyParser.urlencoded({extended:false})); //allows middleware body parsing
const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const databaseAndCollection = {db: "studyAbroad_DB", collection:"students"};
const { MongoClient, ServerApiVersion } = require('mongodb');
const { request } = require("http");

//show welcome page
router.get("/Barcelona", (req, res) => { 
    let studentList; //students in the same city
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "Barcelona";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/ba-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "¡Bienvenidos",
                location: "Barcelona, Spain",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

}).get("/CapeTown", (req, res) => {
    let studentList; //students in the same city
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "Cape Town";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/ct-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "Welkom",
                location: "Cape Town, South Africa",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

}).get("/Florence", (req, res) => { 
    let studentList; //students in the same city
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "Florence";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/fl-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "Benvenuto",
                location: "Florence, Italy",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

}).get("/London", (req, res) => { 
    let studentList; //students in the same city
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "London";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/ld-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "Welcome",
                location: "London, United Kingdom",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

}).get("/Nice", (req, res) => {
   let studentList; //students in the same city
   let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "Nice";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/ni-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "Bienvenue",
                location: "Nice, France",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

}).get("/Tokyo", (req, res) => { 
    let studentList; //students in the same city
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
        try {
            await client.connect();
            let city = "Tokyo";
            studentList = await findStudentsForCity(client, databaseAndCollection, city);
            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                style: `<link href="/styles/tk-styles.css" rel="stylesheet" type="text/css">`,
                greeting: "ようこそ",
                location: "Tokyo, Japan",
                trivia: "Api",
                table: tableString
            } 

            //render the collected data on the screen
            res.render("welcome", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findStudentsForCity(client, databaseAndCollection, city) {
        let filter = {location: city};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);

})




module.exports = router;