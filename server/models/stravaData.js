const mongoose = require('mongoose');

const stravaDataSchema = new mongoose.Schema({
  workoutId: Number,
  data: Object,
  timestamp: Date
}, { versionKey: false});

const StravaData = mongoose.model('workouts', stravaDataSchema);

module.exports = StravaData