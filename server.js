require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 5000;
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
var bodyParser = require('body-parser')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
});

/*
WombleWoo7547 @ https://github.com/WombleWoo7547 https://replit.com/@WombleWoo7547
*/