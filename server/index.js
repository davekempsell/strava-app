const express = require('express')
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

let stravaData

function getStart() {
  const now = new Date
  const month = now.getMonth()
  const year = now.getFullYear()
  const startDate = new Date(year, month, 1)
  const start = Date.parse(startDate) / 1000
  return start.toString()
}

function getEnd() {
  const now = new Date
  const month = now.getMonth()
  const year = now.getFullYear()
  const endDate = new Date(year, month + 1, 1)
  const end = Date.parse(endDate) / 1000
  return end.toString()
}

async function getData(req,res) {
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

    let access_token

    const detailedActivities = await fetch(url, options)
      .then(response => response.json())
      .then((json) => {
        access_token = json.access_token
        const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
        // const start = '1670371200'
        // const end = '1671753600'
        const start = getStart()
        const end = getEnd()
        
        return fetch(`${activities_link}?before=${end}&after=${start}&access_token=${access_token}`)
      })
      .then(response => response.json())
      .then(data => {
      
        const activity_link = 'https://www.strava.com/api/v3/activities'
        const ids = data.map(element => {
          return element.id
        })
        const workouts = ids.map((id) => {
          return fetch(`${activity_link}/${id}?access_token=${access_token}`)
            .then(response => response.json())
            .then((data) => {return data})
        })
        return Promise.all(workouts)
      })
      .then(data => {
        stravaData = data
        console.log('stravaData updated')
        return data
      })
      .catch((err) => console.log(err))
  
      return detailedActivities
}

async function getStravaData(req, res) {
  if(stravaData) {
    res.send(stravaData)
    console.log('displaying from cache')
  } else {
    const apiResponse = await getData()
    res.send(apiResponse)
    console.log('displaying from API')
  }
}

app.get('/', getStravaData)

app.get('/test', (req, res) => {
  setTimeout(() => {
    res.send(example)
  }, 3000)
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})
