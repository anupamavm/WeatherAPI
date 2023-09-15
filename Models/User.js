const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		location: { type: String, required: true },
		weatherData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeatherData' }],
		// Saving Weather data for each user as a array of weatherdata object ids
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
