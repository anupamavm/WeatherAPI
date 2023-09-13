// weatherDataRoutes.js
const express = require('express');
const router = express.Router();
const WeatherData = require('../Models/WeatherData');
const User = require('../Models/User');

router.get('/:email', async (req, res) => {
	try {
		const { email } = req.params;

		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Find all weather data documents for the user
		const weatherData = await WeatherData.find({
			_id: { $in: user.weatherData },
		});

		res.status(200).json(weatherData);
	} catch (error) {
		console.error('Error occurred while fetching weather data:', error);
		res.status(500).json({ error: 'Failed to fetch weather data' });
	}
});

// Get specific weather data for a user by email and date
router.get('/:email/:date', async (req, res) => {
	try {
		const { email, date } = req.params;

		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Find weather data documents for the user matching the specified date
		const weatherData = await WeatherData.find({
			_id: { $in: user.weatherData },
			createdAt: { $gte: new Date(date) },
		});

		res.status(200).json(weatherData);
	} catch (error) {
		console.error('Error occurred while fetching weather data:', error);
		res.status(500).json({ error: 'Failed to fetch weather data' });
	}
});

module.exports = router;
