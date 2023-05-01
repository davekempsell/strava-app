// Load functions used within getData function
const apiHelpers = require('./helpers/apiHelpers')

let allWorkoutsData

const getAllWorkouts = async (req,res) => {
  // initialising access_token variable
  let access_token = await apiHelpers.getAccessToken()

  // get all workouts
  let workouts = await apiHelpers.getAllActivities(access_token)

  allWorkoutsData = workouts
  console.log('StravaData updated')

  return workouts
}

exports.getAllWorkouts = async (req, res) => {
  // if data has already been retrieved from the API, the stored data
  // will be returned to prevent repeat calls to the API causing a 
  // timeout by Strava.
  if(allWorkoutsData) {
    res.send(allWorkoutsData)
    console.log('displaying from memory')
  } else {
    const apiResponse = await getAllWorkouts()
    res.send(apiResponse)
    console.log('displaying from API')
  }
}

const getSingleWorkoutData = async (id) => {
    // initialising access_token variable
  let access_token = await apiHelpers.getAccessToken()

  let workoutData = await apiHelpers.getWorkoutDetails(id, access_token)

  return workoutData
}

exports.getWorkoutData = async (id, res) => {
  const apiResponse = await getSingleWorkoutData(id)
  res.send(apiResponse)
}