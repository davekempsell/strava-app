import React, { useState, useEffect } from 'react'
import example from '../../server/example'

const App = () =>{

  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  function totalMeters(data) {
    let total = 0
    data.forEach(element => {
      total += element.distance
    })
    return total / 1000
  }

  // For testing
  useEffect(() => {
    setData(example)
    setTotal(totalMeters(example))
    setLoading(false)
  }, [])

  // Real API call
  // useEffect(() => {
  //   getWorkouts()
  // },[])

  const getWorkouts = () => {
    fetch('http://localhost:5050/test')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setTotal(totalMeters(data))
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setData('error loading data')
      })
  }
  
  function daysLeft() {
    const today = new Date()
    const day = today.getDate()
    return 22 - day
  }

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
        <p>Workout Intensity: {suffer_score}</p>
        <img src={photo} style={{width: '100%'}}/>
      </div>
    )
  }

  function displayWorkouts() {
    if(loading){
      return (
        <p>Loading...</p>
      )
    } else {
      console.log(data[0].name)
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

  return (
    <div>
      <div>
        <h1>
          Total Distance: {total.toFixed(2)}km
        </h1>
        <h2>
          Distance remaining: {500 - total.toFixed(2)}km
        </h2>
        <h3>Days remaining: {daysLeft()}</h3>
        <h3>Required distance per day: {((500 - total) / daysLeft()).toFixed(2)}km</h3>
      </div>
      {displayWorkouts()}
    </div>
  )
}

export default App