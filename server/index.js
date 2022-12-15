const express = require('express')
const redis = require("redis");
const cors = require('cors')
const morgan = require('morgan')
const fetch = (...args) =>
import('node-fetch').then(({default: fetch}) => fetch(...args));
const example = require('./example')

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.PORT || 5050;

// let stravaData = example

// async function getData() {
//     const url = "https://www.strava.com/oauth/token"
//     const options = {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         refresh_token: process.env.REFRESH_TOKEN,
//         grant_type: 'refresh_token'
//       })
//     }

//     let access_token = ''

//     fetch(url, options)
//       .then(response => response.json())
//       .then((json) => {
//         access_token = json.access_token
//         const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
//         const start = '1670371200'
//         const end = '1671753600'
        
//         return fetch(`${activities_link}?before=${end}&after=${start}&access_token=${access_token}`)
//       })
//       .then(response => response.json())
//       .then(data => {
      
//         const activity_link = 'https://www.strava.com/api/v3/activities'
//         const ids = data.map(element => {
//           return element.id
//         })
//         const workouts = ids.map((id) => {
//           return fetch(`${activity_link}/${id}?access_token=${access_token}`)
//             .then(response => response.json())
//             .then((data) => {return data})
//         })
//         return Promise.all(workouts)
//       })
//       .then(data => {
//         stravaData = data
//         console.log('stravaData updated')
//       })
//       .catch((err) => console.log(err))
// }

// function getStravaData() {
//   setInterval(() => {
//     getData()
//   }, 1800000)
// }

// getStravaData()

// app.get('/', (req,res) => {
//   res.json(stravaData)
// })

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchTokenApiData() {
  const url = "https://www.strava.com/oauth/token"
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  }

  const apiResponse = await fetch(url, options)
  return apiResponse.json()
}

async function getToken() {
  let auth_data;

  try {
    const cacheAuthData = await redisClient.get('token');
    if (cacheAuthData) {
      return cacheAuthData
    } else {
      auth_data = await fetchTokenApiData();
      await redisClient.set('token', auth_data.access_token, {
      EX: auth_data.expires_in,
      NX: true
      });
      return auth_data.access_token
    }
  } catch (error) {
    console.error(error)
    res.status(404)
  }
}

async function fetchActivityDetails() {
  const access_token = await getToken()
  const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
  const activity_link = 'https://www.strava.com/api/v3/activities'
  const start = '1670371200'
  const end = '1671753600'

  const activities = await (await fetch(`${activities_link}?before=${end}&after=${start}&access_token=${access_token}`)).json()
  const activityIds = await activities.map(element => element.id)
  
  const workouts = await activityIds.map(async (id) => {
    const data = await fetch(`${activity_link}/${id}?access_token=${access_token}`)
    const workout = await data.json()
    return workout
  })

  const activityDetails = await Promise.all(workouts)
  return activityDetails
}

async function cacheData (req, res, next) {
  let activity_data;

  try {
    const cacheActivityData = await redisClient.get('data');
    if (cacheActivityData) {
      activity_data = JSON.parse(cacheActivityData)
      res.send({
        fromCache: true,
        data: activity_data
      })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    res.status(404)
  }
}

async function getActivityDetails(req, res) {
  let activity_data;

  try {
    activity_data = await fetchActivityDetails();
    await redisClient.set('data', JSON.stringify(activity_data), {
      EX: 1800,
      NX: true
    });

    res.send({
      fromCache: false,
      data: activity_data
    })
  } catch (error) {
    console.error(error)
    res.status(404).send("Data unavailable")
  }
}

app.get('/', cacheData, getActivityDetails)

app.get('/test', (req, res) => {
  setTimeout(() => {
    res.send(example)
  }, 3000)
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})


