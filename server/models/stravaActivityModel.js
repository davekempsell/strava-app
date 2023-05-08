const mongoose = require('mongoose');

const stravaActivitySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  type: String,
  start_date_local: Date,
});

const StravaActivity = mongoose.model('StravaActivity', stravaActivitySchema, 'daves-workouts');

module.exports = StravaActivity;