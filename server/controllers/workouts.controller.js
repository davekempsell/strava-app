// Load functions used within getData function
const StravaData = require('../models/stravaData')
const apiHelpers = require('./helpers/apiHelpers')

const cache = {
  timestamp: null,
  data: null,
};

const WorkoutsController = {
  getWorkouts: async (req, res) => {
    const now = Date.now();
    let newWorkouts = 0

    // If the cache is less than one hour old, return the cached response data
    if (cache.timestamp && now - cache.timestamp < 3600 * 1000) {
      console.log('returning cached response data');
      res.send(cache.data);
      return;
    }

    // Get the latest workout from the database
    const latestWorkout = await StravaData.findOne();

    // Get all workouts from Strava since the last workout in the database
    const workouts = await apiHelpers.getLatestActivities(latestWorkout.timestamp)
    console.log('latest workouts retrieved from Strava API')

    // Map each workout in workouts to a Promise that checks if it exists in the database
    const promises = workouts.map(async (workout) => {
      const workoutId = workout.id;

      // Check if a document with the same workoutId exists in the database
      const existingWorkout = await StravaData.findOne({ workoutId });

      // If the workout doesn't already exist in the database, save it
      if (!existingWorkout) {
        const newWorkout = new StravaData({
          workoutId: workoutId,
          data: workout,
          timestamp: workout.start_date_local
        });
        newWorkouts += 1;
        await newWorkout.save();
      }
    });

  // Wait for all promises to complete before sending the response
  await Promise.all(promises);
  console.log(newWorkouts + ' workouts added to database')

  // Retrieve all workouts from the database
  const allWorkouts = await StravaData.find().sort({ timestamp: -1 });
  console.log('all workouts returned from database')

  // Update the cache with the new response data and the timestamp of the current request
  cache.timestamp = now;
  cache.data = allWorkouts;

  // Send the response with all the workouts
  res.send(allWorkouts);
  }
}

module.exports = WorkoutsController