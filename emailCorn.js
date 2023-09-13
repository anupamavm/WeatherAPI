const cron = require('node-cron');
const User = require('./Models/User');
const { sendWeatherEmail } = require('./emailService');

// Schedule the email-sending task to run every 3 hours
const emailCronJob = cron.schedule('0 */3 * * *', async () => {
	try {
		// Fetch all registered users
		const users = await User.find();

		// Iterate over each user
		for (const user of users) {
			// Assuming you have a function to retrieve the latest weather data for the user
			// Not implemented
			const latestWeatherData = await getLatestWeatherData(user);

			// Send the weather email to the user
			await sendWeatherEmail(user.email, latestWeatherData);
		}

		console.log('Weather emails sent to all users successfully!');
	} catch (error) {
		console.error('Error occurred while sending weather emails:', error);
	}
});

module.exports = { emailCronJob };
