const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: 'false',
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_EMAIL_APPPW,
	},
});

// Function to send weather email to a user
const sendWeatherEmail = async (email, weatherData) => {
	try {
		// Extract weather information passed to the send mail function
		const { name, main, weather, wind, sys } = weatherData;

		// Compose the email message
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: `Weather Update for ${name}`,
			text: `Here is the weather update for ${name}:
		  - Description: ${weather[0].description}
		  - Temperature: ${main.temp}°C (Feels like ${main.feels_like}°C)
		  - Humidity: ${main.humidity}%
		  - Pressure: ${main.pressure} hPa
		  - Wind: ${wind.speed} m/s, ${wind.deg}°
		  - Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}
		  - Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}
  
		  For more details, please visit: https://openweathermap.org/city/${
				weatherData.id
			}
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
