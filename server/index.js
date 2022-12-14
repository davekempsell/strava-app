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

let stravaData = example

async function getData() {
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

    let access_token = ''

    fetch(url, options)
      .then(response => response.json())
      .then((json) => {
        access_token = json.access_token
        const activities_link = 'https://www.strava.com/api/v3/athlete/activities'
        const start = '1670371200'
        const end = '1671753600'
        
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
      })
      .catch((err) => console.log(err))
}

function getStravaData() {
  setInterval(() => {
    getData()
  }, 1800000)
}

getStravaData()

app.get('/', (req,res) => {
  res.json(stravaData)
})

app.get('/update', (req, res) => {
  getData()
  res.send('Strava Data Updated')
})

app.get('/test', (req, res) => {
  setTimeout(() => {
    res.send(example)
  }, 3000)
})

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})


