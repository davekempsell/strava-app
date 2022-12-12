import React from 'react'

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
    <div key={workout.id} style={{border: 'solid 1px black', width: '50vw'}}>
      <p>{workout.name}</p>
      <p>{`${dd}/${mm}/${yyyy} ${time}`}</p>
      <p>Activity Type: {activityType}</p>
      <p>Distance: {(distance / 1000).toFixed(2)}km</p>
      <p>Duration: {`${hours}hr ${minutes}mins`}</p>
      <p>Ave. Speed: {aveSpeed.toFixed(1)}km/h</p>
      <p>Ave. Watts: {aveWatts}</p>
      <p>Ave. HR: {aveHr.toFixed(0)}bpm</p>
      <p>Relative Effort: {suffer_score}</p>
      <img src={photo} style={{width: '100%'}}/>
    </div>
  )
}

export default function DisplayWorkouts(loading, data) {
  if(loading){
    return (
      <div>
        <h3>Workouts</h3>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Workouts</h3>
        {data.map((element) => {
          return workoutCard(element)
        })}
      </div>
    )
  }
}