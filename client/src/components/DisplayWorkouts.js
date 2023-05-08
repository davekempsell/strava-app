import React from 'react'

import './DisplayWorkouts.css'
import { WorkoutCard } from './WorkoutCard'

export const DisplayWorkouts = ({data, setShowSingleWorkout, setWorkoutId}) => {

  if(!data) return (<div className='loading-container'></div>)

  if(data) return (
    <div className="workout-cards-container">
      {data.map((element) => {
        return WorkoutCard(element, setShowSingleWorkout, setWorkoutId)
      })}
    </div>
  )
}