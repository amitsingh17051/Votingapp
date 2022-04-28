require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT | 5000;

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
});

/*
WombleWoo7547 @ https://github.com/WombleWoo7547 https://replit.com/@WombleWoo7547
*/