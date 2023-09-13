const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const WeatherData = require('../Models/WeatherData');
const bcrypt = require('bcrypt');
const { fetchWeatherData } = require('../weatherAPI');

router.get('/', (req, res) => {
	res.send('Hello Api');
});

// Registration route
router.post('/register', async (req, res) => {
	try {
		const { email, password, location } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		// Fetch weather data
		const weatherData = await fetchWeatherData(location);

		// Create a new WeatherData document and save it
		const newWeatherData = new WeatherData(weatherData);
		await newWeatherData.save();

		// Create a new user and link it to the weather data
		const user = new User({
			email,
			password: hashedPassword,
			location,
			weatherData: newWeatherData._id, // Assign the ObjectId of the weather data
		});
		await user.save();

		res.status(201).json(user);
	} catch (error) {
		console.error('Registration Error:', error);
		res.status(500).json({ error: 'Failed to register user' });
	}
});

// Login route
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({ error: 'User not found' });
		} else {
			const passwordMatch = await bcrypt.compareSync(password, user.password);
			if (passwordMatch) {
				res.status(200).json({ message: 'Login successful' });
			} else {
				res.status(401).json({ error: 'Invalid password' });
			}
		}

		// res.status(500).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Failed to login' });
	}
});

// Update location route
router.put('/location', async (req, res) => {
	try {
		const { email, location } = req.body;
		await User.updateOne({ email }, { location });
		res.status(200).json({ message: 'Location updated successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update location' });
	}
});

//Get Weather Data

module.exports = router;
