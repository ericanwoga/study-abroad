const express = require("express");
const router = express.Router(); //works like app. 

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
// Our database and collection 
const databaseAndCollection = {db: "studyAbroad_DB", collection:"students"};
const { MongoClient, ServerApiVersion } = require('mongodb');



//Our archive page
router.get("/", (req, res) => {
    let studentList; //students in the program
    let tableString = "";

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            studentList = await findAllStudents(client, databaseAndCollection);

            //make a table of students in same city
            studentList.forEach(student =>{ tableString +=
                `<tr>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.location}</td>
                    <td>${student.semester}</td>
                </tr>`
            });

            let info={
                table: tableString
            } 

            //render the collected data on the screen
            res.render("archive", info);
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    async function findAllStudents(client, databaseAndCollection) {
        let filter = {};
        const cursor = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .find(filter);
    
        const result = await cursor.toArray();  //returns all students going to that city
        return result;
    }
    
    main().catch(console.error);
});

//process deletion
router.post("/", (req, res) => {
    

    async function main() {
        const uri = `mongodb+srv://${userName}:${password}@cluster0.nhlhr7e.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        try {
            await client.connect();
            await client.db(databaseAndCollection.db)
            .collection(databaseAndCollection.collection)
            .deleteMany({});
            
            res.render("archive");
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    
    main().catch(console.error);
});





module.exports = router;