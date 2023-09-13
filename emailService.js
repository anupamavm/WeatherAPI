const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'thenunof@gmail.com',
		pass: '',
	},
});

// Function to send weather email to a user
const sendWeatherEmail = async (email, weatherData) => {
	try {
		// Compose the email message
		const mailOptions = {
			from: 'thenunof@gmail.com',
			to: email,
			subject: 'Weather Update',
			text: `Here is the weather update for your location:
        Temperature: ${weatherData.temperature}
        Humidity: ${weatherData.humidity}
        // Add more weather data fields as needed
      `,
		};

		// Send the email
		await transporter.sendMail(mailOptions);
		console.log('Weather email sent successfully!');
	} catch (error) {
		console.error('Error occurred while sending weather email:', error);
		throw error;
	}
};

module.exports = { sendWeatherEmail };
