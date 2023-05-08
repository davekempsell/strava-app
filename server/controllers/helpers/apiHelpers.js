const fetch = (...args) =>
import('node-fetch').then(({default: fetch}) => fetch(...args));

// Load getStart and getEnd functions
const getDates = require('./getDates')

require('dotenv').config()

// Using environment variables stored in .env to retrieve Strava API access key
exports.getAccessToken = async () => {
  // set url for accessing strava auth token
  const url = "https://www.strava.com/oauth/token"
  // set header options for accessing strava auth token
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // retrieving environment variables from .env file
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  }

  const response = await fetch(url, options)
  const json = await response.json()
  return json.access_token
}

// Using the getStart and getEnd functions, and access_token to create the url to access
// the current month's activities.
getActivitiesUrl = async (startDate) => {
  const access_token = await this.getAccessToken()
  const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
  const start = startDate
  const end = getDates.getNow()

  return `${activities_link}?before=${end}&after=${start}&page=1&per_page=200&access_token=${access_token}`
}

// Using the activities url to retrieve the list of workouts since a given date
exports.getLatestActivities = async (lastWorkout) => {
  // if no timestamp passed to function, start date is set to two years ago
  const startDate = getDates.convertToUnix(lastWorkout) ?? getDates.getStart()
  
  const activitiesUrl = await getActivitiesUrl(startDate)
  const response = await fetch(activitiesUrl)
  const json = await response.json()

  return json
}

// Using activity ID and access_token to get detailed info for a specific workout from the API
// exports.getWorkoutDetails = async (id, access_token) => {
//   const activity_link = 'https://www.strava.com/api/v3/activities';
//   const response = await fetch(`${activity_link}/${id}?access_token=${access_token}`)
//   const json = response.json()

//   return json
// }