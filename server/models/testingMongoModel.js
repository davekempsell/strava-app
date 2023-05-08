const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  stravaId: { type: Number, required: true},
  name: { type: String, required: true},
}, { versionKey: false});

const TestActivity = mongoose.model('workout-data', testSchema, 'daves-workouts');

module.exports = TestActivity;