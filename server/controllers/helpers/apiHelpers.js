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
getActivitiesUrl = async (access_token) => {
  const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
  const start = getDates.getStart()
  const end = getDates.getEnd()

  return `${activities_link}?before=${end}&after=${start}&page=1&per_page=100&access_token=${access_token}`
}

// Using the activities url to retrieve the IDs for this month's activities
exports.getActivityIds = async (access_token) => {
  const activitiesUrl = await getActivitiesUrl(access_token)
  const response = await fetch(activitiesUrl)
  console.log(response)
  const json = await response.json()
  const ids = json.map(element => {
    return element.id
    })

  return ids
}

// Using the activities url to retrieve the list of workouts since 1 Jan 2020
exports.getAllActivities = async (access_token) => {
  const activitiesUrl = await getActivitiesUrl(access_token)
  const response = await fetch(activitiesUrl)
  const json = await response.json()

  return json
}

// Using activity ID and access_token to get detailed info for a specific workout from the API
exports.getWorkoutDetails = async (id, access_token) => {
  const activity_link = 'https://www.strava.com/api/v3/activities';
  const response = await fetch(`${activity_link}/${id}?access_token=${access_token}`)
  const json = response.json()

  return json
}