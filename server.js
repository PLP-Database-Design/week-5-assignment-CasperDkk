// Import dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

//configure environemnt variables
dotenv.config();


//Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Test the Connection
db.connect((err) => {
    //if connection is not successful
    if (err) {
       return console.error("Error connecting to database: ", err)
    }

    //if connection is successful
    console.log("Successfully Connected to MySQL: ", db.threadId)
})

//This helps configure use of ejs to format data presented from sql
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT first_name, last_name FROM patients"
    db.query(getPatients, (err, data) => {
        //If I have an error
        if (err) {
            return res.status(400).send("Failed to get patients")
        }

        res.status(200).render('data', { data })  //view structured data (ejs)
        // res.status(200).send(data)  // view data in raw form
    })
})


//start and listen to the server
app.listen(3300, () => {
    console.log(`Server is Running on Port 3300...`)
})

