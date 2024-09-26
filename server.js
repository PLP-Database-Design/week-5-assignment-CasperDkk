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


//Question 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, data) => {
        //If I have an error
        if (err) {
            return res.status(400).send("Failed to get patients")
        }

        res.status(200).render('data', { data })  //view structured data (ejs)
        // res.status(200).send(data)  // view data in JSON format
    })
})

//Question 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, data) => {
        //If I have an error
        if (err) {
            return res.status(400).send("Failed to get providers")
        }

        res.status(200).render('data', { data })  //view structured data (ejs)
        // res.status(200).send(data)  // view data in JSON format
    })
})

//Question 3. Filter patients by first name
app.get('/patients-filter', (req, res) => {
    const firstName = req.query.first_name;
    const getPatientsByName = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
    db.query(getPatientsByName, [firstName], (err, data) => {
        //If I have an error
        if (err) {
            return res.status(400).send("Failed to get patients by first name")
        }

        res.status(200).render('data', { data })  //view structured data (ejs)
        // res.status(200).send(data)  // view data in JSON format
    })
});

//Question 4. Retrieve providers by specialty
app.get('/providers-specialty', (req, res) => {
    const specialty = req.query.provider_specialty;
    const getProvidersBySpecialty = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
    db.query(getProvidersBySpecialty, [specialty], (err, data) => {
        //If I have an error
        if (err) {
            return res.status(400).send("Failed to get providers by specialty")
        }

        res.status(200).render('data', { data })  //view structured data (ejs)
        // res.status(200).send(data)  // view data in JSON format
    })
})


//start and listen to the server
const PORT=3300
app.listen(3300, () => {
    console.log(`Server is Running on Port 3300...`)
})

