// Load functions used within getData function
const StravaData = require('../models/stravaData')
const apiHelpers = require('./helpers/apiHelpers')

const WorkoutsController = {
  getWorkouts: async (req, res) => {
    // Get the latest workout from the database
    const latestWorkout = await StravaData.findOne();
    console.log('latestworkout' + latestWorkout.timestamp)

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

        await newWorkout.save();
      }
    });

  // Wait for all promises to complete before sending the response
  await Promise.all(promises);
  console.log('latest workouts added to database')

  // Retrieve all workouts from the database
  const allWorkouts = await StravaData.find();
  console.log('all workouts returned from database')

  res.send(allWorkouts);
  }
}

module.exports = WorkoutsController