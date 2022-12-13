import React from 'react'
import { BsDropletFill, BsSpeedometer2 } from 'react-icons/bs'
import { GiPathDistance } from 'react-icons/gi'
import { BiTimer } from 'react-icons/bi'
import { ImPower } from 'react-icons/im'
import { FaHeartbeat } from 'react-icons/fa'

import './DisplayWorkouts.css'

const workoutCard = (workout) => {
  const newDate = new Date(workout.start_date_local)
  const yyyy = newDate.getFullYear()
  const mm = newDate.getMonth() + 1
  const dd = newDate.getDate()
  const time = newDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const activityType = workout.type
  const distance = workout.distance
  const duration = workout.moving_time
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration / 60) % 60
  const aveSpeed = (distance / 1000) / (duration / 3600)
  const aveWatts = workout.average_watts.toFixed(0)
  const aveHr = workout.average_heartrate
  const suffer_score = workout.suffer_score
  const photo = workout.photos.primary.urls[600]

  return (
    <div className="workout-card" key={workout.id}>
      <h2>{workout.name}</h2>
      <img src={photo} style={{width: '100%'}} alt="screenshot of workout from Strava"/>
      <p>{`${dd}/${mm}/${yyyy} ${time}`}</p>
      <p>{activityType}</p>
      <div className="workout-stats-container">
        <div id="stat">
          <GiPathDistance/>
          <p>{(distance / 1000).toFixed(2)}km</p>
          <p className="label">Distance</p>
        </div>
        <div id="stat">
          <BiTimer/>
          <p>{`${hours}hr ${minutes}m`}</p>
          <p className="label">Duration</p>
        </div>
        <div id="stat">
          <BsSpeedometer2/>
          <p>{aveSpeed.toFixed(1)}km/h</p>
          <p className="label">Ave. Speed</p>
        </div>
        <div id="stat">
          <ImPower/>
          <p>{aveWatts}w</p>
          <p className="label">Ave. Power</p>
        </div>
        <div id="stat">
          <FaHeartbeat id="heartbeat"/>
          <p>{aveHr.toFixed(0)}bpm</p>
          <p className="label">Ave. HR</p>
        </div>
        <div id="stat">
          <BsDropletFill id="droplet"/>
          <p>{suffer_score}</p>
          <p className="label">Relative Effort</p>
        </div>
      </div>
    </div>
  )
}

export default function DisplayWorkouts(loading, data) {
  function workoutCards() {
    if(loading) {
      return (
        <p>Loading...</p>
      )
    } else {
      return (
        <div className="workout-cards-container">
          {data.map((element) => {
            return workoutCard(element)
          })}
        </div>
      )
    }
  }

    return (
      <div className="display-workouts-container">
        <h2>Completed Workouts:</h2>
        {workoutCards()}
      </div>
    )
}