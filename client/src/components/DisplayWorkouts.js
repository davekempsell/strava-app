import React from 'react'
import css from './DisplayWorkouts.css'

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
  const aveWatts = workout.average_watts
  const aveHr = workout.average_heartrate
  const suffer_score = workout.suffer_score
  const photo = workout.photos.primary.urls[600]

  return (
    <div className="workout-card" key={workout.id}>
      <h2>{workout.name}</h2>
      <img src={photo} style={{width: '100%'}}/>
      <p>{`${dd}/${mm}/${yyyy} ${time}`}</p>
      <p>{activityType}</p>
      <div className="workout-stats-container">
        <p>Distance: {(distance / 1000).toFixed(2)}km</p>
        <p>Duration: {`${hours}hr ${minutes}mins`}</p>
        <p>Ave. Speed: {aveSpeed.toFixed(1)}km/h</p>
        <p>Ave. Watts: {aveWatts}</p>
        <p>Ave. HR: {aveHr.toFixed(0)}bpm</p>
        <p>Relative Effort: {suffer_score}</p>
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