const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		location: { type: String, required: true },
		weatherData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeatherData' }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
