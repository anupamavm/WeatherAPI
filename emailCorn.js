const cron = require('node-cron');
const User = require('./Models/User');
const { sendWeatherEmail } = require('./emailService');
const WeatherData = require('./Models/WeatherData');

// Schedule the email-sending task to run every 3 hours  - '0 */3 * * *'
const emailCronJob = cron.schedule('0 */3 * * *', async () => {
	try {
		// Fetch all registered users
		const users = await User.find();

		// Iterate over each user
		for (const user of users) {
			// Find the latest weather data
			const latestWeatherData = await WeatherData.findOne({
				_id: user.weatherData,
			})
				.sort({ createdAt: -1 })
				.lean();

			if (!latestWeatherData) {
				console.error(`No weather data found for user: ${user.email}`);
				continue; // Skip this user if no weather data is available
			}

			// Send the weather email to the user
			await sendWeatherEmail(user.email, latestWeatherData);
		}

		console.log('Weather emails sent to all users successfully!');
	} catch (error) {
		console.error('Error occurred while sending weather emails:', error);
	}
});

module.exports = { emailCronJob };
