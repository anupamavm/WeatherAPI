const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT || 3000;
const { startCornJob, cronJob } = require('./weatherScheduler');
const { emailCronJob } = require('./emailCorn');

//Importing Routes to the Server
const userRoutes = require('./Routes/userRoutes');
const weatherDataRoutes = require('./Routes/weatherDataRoutes');

app.use('/api/users', userRoutes);
app.use('/api/weather', weatherDataRoutes);

const mongoURI = process.env.DB_URL; // MongoDB connection string

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
		cronJob.start();
		// emailCronJob.start();
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
