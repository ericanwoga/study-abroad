const express = require("express");
const router = express.Router(); //works like app. 
const bodyParser = require("body-parser"); // handles post paramer
router.use(bodyParser.urlencoded({extended:false})); //allows middleware body parsing
const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
// Our database and collection 
const databaseAndCollection = {db: "studyAbroad_DB", collection:"students"};
const { MongoClient, ServerApiVersion } = require('mongodb');

//show application form
router.get("/", (req, res) => { 
    res.render("apply");
}).post("/", (req, res) =>{
    //get the student's form
    let studentInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentID: req.body.studentID,
        location: req.body.location,
        semester: req.body.semester
    };


    //add the information to the database
    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            
            //check if no id exist before adding 
            let found = await findMatchingID(client, databaseAndCollection, studentInfo.studentID);

            if(found){
                //same ID was found, DO NOT ADD TO DATABASE
                let errorMsg = {
                    error: `ERROR! Student with ID ${studentInfo.studentID} already submitted an application.`
                }

                res.render("apply", errorMsg);
            }else{
                //success, add to database
                await client.db(databaseAndCollection.db)
                .collection(databaseAndCollection.collection)
                .insertOne(studentInfo);

                //go to info page
                res.render("welcome", studentInfo);
            }
            
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }

        //function that searches database for a matching ID
        async function findMatchingID(client, databaseAndCollection, id) {
            let filter = {studentID: id};
            const result = await client.db(databaseAndCollection.db)
            .collection(databaseAndCollection.collection)
            .findOne(filter);
        
           return result;
        }
    }
    main().catch(console.error);
});

module.exports = router;