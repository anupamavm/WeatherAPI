const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
const { startCornJob, cronJob } = require('./weatherScheduler');

//Importing Routes to the Server
const userRoutes = require('./Routes/userRoutes');
const weatherDataRoutes = require('./Routes/weatherDataRoutes');

app.use('/api/users', userRoutes);
app.use('/api/weather', weatherDataRoutes);

const mongoURI =
	'mongodb+srv://admin:ZIx62P2pRSRZLEeU@weatherapi.oxaij9q.mongodb.net/'; // MongoDB connection string

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
		cronJob.start();
		// startCornJob();
	})
	.catch((err) => console.error('Failed to connect to MongoDB', err));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Checking the fetchWeatherData Function
// const location = 'New York';
// fetchWeatherData(location)
// 	.then((weatherData) => {
// 		console.log(weatherData);
// 	})
// 	.catch((error) => {
// 		console.error('Error fetching weather data:', error);
// 	});
