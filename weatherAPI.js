const axios = require('axios');

// Function to fetch weather data from the OpenWeather API
const fetchWeatherData = async (location) => {
	try {
		// const apiKey = '5eb96869aeaab13dc235024cb8e318b6';
		const apiKey = process.env.WEATHER_API_Key;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

		const response = await axios.get(url);
		const weatherData = response.data;

		return weatherData;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		throw error;
	}
};

module.exports = { fetchWeatherData };
