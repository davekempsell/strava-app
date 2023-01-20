// Load functions used within getData function
const apiHelpers = require('./helpers/apiHelpers')

let stravaData

const getData = async (req,res) => {
  // initialising access_token variable
  let access_token = await apiHelpers.getAccessToken()

  // get array of activity id numbers 
  const ids = await apiHelpers.getActivityIds(access_token)
  
  // iterating through the IDs array to get detailed info for each workout,
  // returned as an array of workout objects containing details
  const detailedActivities = await Promise.all(
    ids.map( (id) => {
      return apiHelpers.getWorkoutDetails(id, access_token) 
    })
  ) 

  // setting stravaData variable to retrieved data
  stravaData = detailedActivities
  console.log('StravaData updated')

  return detailedActivities
}

exports.getStravaData = async (req, res) => {

  // if data has already been retrieved from the API, the stored data
  // will be returned to prevent repeat calls to the API causing a 
  // timeout by Strava.
  if(stravaData) {
    res.send(stravaData)
    console.log('displaying from memory')
  } else {
    const apiResponse = await getData()
    res.send(apiResponse)
    console.log('displaying from API')
  }
}