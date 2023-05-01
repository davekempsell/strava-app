import React, { useEffect, useState } from 'react'
import { BsDropletFill, BsSpeedometer2 } from 'react-icons/bs'
import { GiPathDistance } from 'react-icons/gi'
import { BiTimer } from 'react-icons/bi'
import { ImPower } from 'react-icons/im'
import { FaHeartbeat } from 'react-icons/fa'
import { IoCloseCircle } from 'react-icons/io5'

import './DisplaySingleWorkout.css'
import { getSingleWorkout } from './api-calls/getSingleWorkout'

const workoutCard = (workout, handleClose) => {
  const newDate = new Date(workout.start_date_local)
  const yyyy = newDate.getFullYear()
  const mm = newDate.getMonth() + 1
  const dd = newDate.getDate()
  const time = newDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const activityType = workout.type
  const distance = workout.distance ? workout.distance : 'N/A'
  const distanceStat = workout.distance ? (workout.distance / 1000).toFixed(2) + 'km' : 'N/A'
  const duration = workout.moving_time
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration / 60) % 60
  const aveSpeed = distance !== 'N/A' ? ((distance / 1000) / (duration / 3600)).toFixed(1) + 'km/h' : 'N/A'
  const aveWatts = workout.average_watts ? workout.average_watts.toFixed(0) + 'w' : 'N/A'
  const aveHr = workout.average_heartrate
  const suffer_score = workout.suffer_score
  const photo = workout.photos?.primary ? workout.photos.primary.urls[600] : 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns='

  const handleCardClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="single-workout-card" key={workout.id} onClick={handleCardClick}>
      <button onClick={() => handleClose()}><IoCloseCircle /></button>
      <h2>{workout.name}</h2>
      <img src={photo} style={{width: '100%'}} alt="screenshot of workout from Strava"/>
      <div className="date-and-type">
        <p>{`${dd}/${mm}/${yyyy} ${time}`}</p>
        <p>{activityType}</p>
      </div>
      <div className="workout-stats-container">
        <div id="stat">
          <GiPathDistance/>
          <p>{distanceStat}</p>
          <p className="label">Distance</p>
        </div>
        <div id="stat">
          <BiTimer/>
          <p>{`${hours}hr ${minutes}m`}</p>
          <p className="label">Duration</p>
        </div>
        <div id="stat">
          <BsSpeedometer2/>
          <p>{aveSpeed}</p>
          <p className="label">Ave. Speed</p>
        </div>
        <div id="stat">
          <ImPower/>
          <p>{aveWatts}</p>
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

export const DisplaySingleWorkoutModal = ({workoutId, handleClose}) => {
  const [workoutData, setWorkoutData] = useState(null)

  useEffect(() => {
    // disable scrolling on the rest of the page
    document.body.style.overflow = 'hidden';

    getSingleWorkout(workoutId).then((data) => {
      setWorkoutData(data)
    })

    // re-enable scrolling on the rest of the page when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [workoutId])

  return (
    <div className="single-workout-container" onClick={() => handleClose()}>
      {workoutData && workoutCard(workoutData, handleClose)}
    </div>
  )
}