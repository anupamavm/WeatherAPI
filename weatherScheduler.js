const cron = require('node-cron');
const { fetchWeatherData } = require('./weatherAPI');
const WeatherData = require('./Models/WeatherData');
const User = require('./Models/User');

// Schedule the task to run every hour
const cronJob = cron.schedule('0 * * * *', async () => {
	try {
		// Fetch all registered users
		const users = await User.find();

		// Iterate over each user
		for (const user of users) {
			const weatherData = await fetchWeatherData(user.location);

			// Save the weather data to the WeatherData collection
			const newWeatherData = new WeatherData(weatherData);
			await newWeatherData.save();

			// Update the user's weatherData field with the new data
			user.weatherData.push(newWeatherData._id);
			await user.save();
		}

		console.log('Weather data fetched and saved successfully!');
	} catch (error) {
		console.error(
			'Error occurred while fetching and saving weather data:',
			error
		);
	}
});

const startCornJob = () => {
	if (!isCollectionEmpty(users)) {
		cronJob.start();
	}
};

module.exports = { cronJob, startCornJob };
